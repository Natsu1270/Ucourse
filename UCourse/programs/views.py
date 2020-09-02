import json
import uuid

from rest_framework import generics, permissions, status
from rest_framework.response import Response

from courses.models import Course
from services.momo_service import MoMoService, MoMoQueryStatusService
from .serializers import FieldSerializer, FieldMinSerializer, ProgramDetailSerializer, ProgramSerializer
from .models import Field, Program, UserBuyProgram, StudentProgram, UserViewProgram


class FieldListAPI(generics.ListAPIView):
    serializer_class = FieldSerializer
    queryset = Field.objects.all().order_by('id')


class FieldListMinAPI(generics.ListAPIView):
    serializer_class = FieldMinSerializer
    queryset = Field.objects.all().order_by('name')


class FieldDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'slug'
    serializer_class = FieldSerializer
    queryset = Field.objects.all().order_by('name')


class ProgramListAPI(generics.ListAPIView):
    serializer_class = ProgramSerializer
    queryset = Program.objects.all()


class ProgramDetailAPI(generics.RetrieveAPIView):
    lookup_field = 'slug'
    serializer_class = ProgramDetailSerializer
    queryset = Program.objects.all()

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        if self.request.user.is_anonymous:
            UserViewProgram.objects.create(program_id=instance.id)
        else:
            UserViewProgram.objects.create(user=self.request.user, program_id=instance.id)
        return Response(serializer.data)

    def get_serializer_context(self):
        return {"user": self.request.user}


class BuyProgramAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        user = request.user
        program_id = request.data['program_id']
        program = Program.objects.get(pk=program_id)
        program_courses = program.program_course.all()

        price = 0
        for course in program_courses:
            if course.check_is_bought(student=user) is not True:
                price += int(course.get_price())

        if price != 0:
            orderId = str(uuid.uuid4())
            requestId = str(uuid.uuid4())
            orderInfo = 'Card Payment'
            returnUrl = request.META["HTTP_REFERER"] + "/redirect"
            notifyUrl = request.build_absolute_uri() + "/success"
            extraData = request.META["HTTP_REFERER"]
            momo = MoMoService(orderInfo, returnUrl, notifyUrl, price, orderId, requestId, extraData)
            response = momo.call()
            response_data = response.content.decode("utf-8")
            json_response = json.loads(response_data)
            payUrl = json_response['payUrl']

            return Response({
                "data": {
                    "payUrl": payUrl
                },
                "result": True,
                "message": "Register Successfully",
                "status_code": 201
            }, status=status.HTTP_201_CREATED)

        UserBuyProgram.objects.create(user=user, program_id=program_id)
        StudentProgram.objects.create(student_id=user.id, program_id=program_id)

        if program_courses.count() > 0:
            for course in program_courses:
                if user not in course.user_buy.all():
                    course.user_buy.add(user)
                    course.save()
        return Response({
            "data": {
            },
            "result": True,
            "message": "Register Successfully",
            "status_code": 201
        }, status=status.HTTP_201_CREATED)


class BuyProgramSuccessAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        partnerRefId = request.data["partnerRefId"]
        requestId = request.data["requestId"]
        user = request.user
        program_id = request.data['program']
        errorCode = request.data['errorCode']
        extraData = request.data['extraData']
        resUrl = extraData.split("=")[1]

        if errorCode == "0":
            query = MoMoQueryStatusService(partnerRefId=partnerRefId, requestId=requestId)
            response = query.call()
            response_data = response.content.decode("utf-8")
            json_response = json.loads(response_data)
            if json_response["data"]["status"] == 0:
                # Program.objects.get(pk=program_id)
                amount = json_response["data"]["amount"]
                try:
                    instance = UserBuyProgram.objects.get(user=user, program_id=program_id)
                    instance.money = amount
                    instance.save()
                except UserBuyProgram.DoesNotExist:
                    UserBuyProgram.objects.create(user=user, program_id=program_id, money=amount)

                StudentProgram.objects.create(student_id=user.id, program_id=program_id)
                return Response({
                    "redirect": resUrl,
                    "result": True,
                }, status=status.HTTP_200_OK)

        return Response({
            "redirect": resUrl,
            "result": False,
        }, status=status.HTTP_200_OK)