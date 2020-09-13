import json
import uuid
from django.db.models import Q
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from courses.models import Course, UserBuyCourse, UserCourse
from notifications.models import Notification
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
        return {"user": self.request.user, "request": self.request}


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
            if course.check_is_bought(student=user) is not True and not course.check_is_completed(student=user):
                price += int(course.get_price())

        if price != 0:
            if program.discount_percentage:
                price *= (1 - program.discount_percentage/100)
            price = int(price)
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

        UserBuyProgram.objects.create(user=user, program_id=program_id, money=0)
        StudentProgram.objects.create(student_id=user.id, program_id=program_id)
        Notification.objects.create(user=user, reference=program_id, type='2')

        if program_courses.count() > 0:
            for course in program_courses:
                user_course = UserCourse.objects.filter(
                    Q(user_id=user.id) & Q(course_id=course.id) & ~Q(status='fail')).count()
                if user_course > 0:
                    pass
                else:
                    if not course.check_is_bought(user):
                        UserBuyCourse.objects.create(user=user, course=course, money=0, in_program=True, status=True)
                        UserCourse.objects.create(user=user, course=course, program_id=program_id)

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

        if errorCode == "0":
            query = MoMoQueryStatusService(partnerRefId=partnerRefId, requestId=requestId)
            response = query.call()
            response_data = response.content.decode("utf-8")
            json_response = json.loads(response_data)
            if json_response["data"]["status"] == 0:
                Notification.objects.create(user=user, reference=program_id, type='2')
                amount = json_response["data"]["amount"]
                check_bought = UserBuyProgram.objects.filter(user=user, program_id=program_id).count()
                if check_bought > 0:
                    return Response({
                        "code": 10,
                        "redirect": None,
                        "result": True,
                    }, status=status.HTTP_200_OK)

                UserBuyProgram.objects.create(user=user, program_id=program_id, money=amount)
                StudentProgram.objects.create(student_id=user.id, program_id=program_id)
                Notification.objects.create(user=user, reference=program_id, type='2')
                program = Program.objects.get(pk=program_id)
                program_courses = program.program_course.all()
                for course in program_courses:
                    user_course = UserCourse.objects.filter(
                        Q(user_id=user.id) & Q(course_id=course.id) & ~Q(status='fail')).count()
                    if user_course > 0:
                        pass
                    else:
                        if not course.check_is_bought(user):
                            UserBuyCourse.objects.create(user=user, course=course, money=0, in_program=True,
                                                         status=True)
                            UserCourse.objects.create(user=user, course=course, program_id=program_id)

                return Response({
                    "code": 0,
                    "redirect": None,
                    "result": True,
                }, status=status.HTTP_200_OK)

        return Response({
            "code": 11,
            "redirect": None,
            "result": False,
        }, status=status.HTTP_200_OK)