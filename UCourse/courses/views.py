from rest_framework.response import Response
from rest_framework import generics, permissions, views, status
from .serializers import CourseSerializer, CourseDetailSerializer, UserBuyCourseSerializer
from api.permissions import IsTeacherOrTARoleOrReadOnly
from .models import Course, CourseDetail, UserBuyCourse
import uuid
from services.momo_service import MoMoService, MoMoQueryStatusService
from django.shortcuts import render, redirect, get_object_or_404, reverse
import json



class CourseListView(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsTeacherOrTARoleOrReadOnly
    ]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        queryset = Course.objects.all()
        query = self.request.query_params.get('name', None)
        if query is not None:
            queryset = queryset.filter(title__icontains=query)
        return queryset


class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = "slug"
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsTeacherOrTARoleOrReadOnly
    ]

    def get_serializer_context(self):
        user = self.request.user
        if user.is_anonymous:
            return {"user": None}
        return {"user": user}


class BuyCourseAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        user = request.user
        course_id = request.data['course']
        course = Course.objects.get(pk=course_id)
        amount = course.get_price()
        if amount != 0:
            orderId = str(uuid.uuid4())
            requestId = str(uuid.uuid4())
            orderInfo = 'Card Payment'
            returnUrl = request.META["HTTP_REFERER"] + "/redirect"
            notifyUrl = request.build_absolute_uri() + "/success"
            extraData = request.META["HTTP_REFERER"]
            momo = MoMoService(orderInfo, returnUrl,
                                notifyUrl, amount, orderId, requestId, extraData)

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
        
        instance = UserBuyCourse.objects.create(user=user, course_id=course_id)
        return Response({
            "data": {
                
            },
            "result": True,
            "message": "Register Successfully",
            "status_code": 201
        }, status=status.HTTP_201_CREATED)

class BuyCourseSuccessAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def post(self, request, *args, **kwargs):
        partnerRefId = request.data["partnerRefId"]
        requestId = request.data["requestId"]
        user = request.user
        course_id = request.data['course']
        errorCode = request.data['errorCode']
        extraData = request.data['extraData']
        resUrl = extraData.split("=")[1]

        print(extraData)
        if (errorCode == "0"):
            query = MoMoQueryStatusService(partnerRefId=partnerRefId, requestId=requestId)
            response = query.call()
            response_data = response.content.decode("utf-8")
            json_response = json.loads(response_data)
            if json_response["data"]["status"] == 0:    
                course = Course.objects.get(pk=course_id)
                try:
                   UserBuyCourse.objects.get(user=user, course_id=course_id)
                except:
                    instance = UserBuyCourse.objects.create(user=user, course_id=course_id)
                return Response({
                        "redirect": resUrl,
                        "ok": True,
                    }, status=status.HTTP_201_CREATED)
                    
        return Response({
            "redirect": resUrl,
            "ok": False,
        }, status=status.HTTP_201_CREATED)

class CheckIsBought(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    @staticmethod
    def post(request):
        course_id = request.data['course']
        try:
            instance = UserBuyCourse.objects.get(user=request.user, course_id=course_id)
            return Response({
                "result": True,
                "status_code": 200
            }, status=status.HTTP_200_OK)
        except UserBuyCourse.DoesNotExist:
            return Response({
                "result": False,
                "status_code": 400
            }, status=status.HTTP_400_BAD_REQUEST)
