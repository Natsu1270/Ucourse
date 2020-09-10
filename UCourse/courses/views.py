from rest_framework.response import Response
from rest_framework import generics, permissions, views, status
from django.core import serializers

from notifications.models import Notification
from .serializers import CourseSerializer, CourseDetailSerializer, UserBuyCourseSerializer, FavoriteCourseSerializer
from api.permissions import IsTeacherOrTARoleOrReadOnly
from .models import Course, CourseDetail, UserBuyCourse, UserViewCourse, FavoriteCourse
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

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        if self.request.user.is_anonymous:
            UserViewCourse.objects.create(course_id=instance.id)
        else:
            UserViewCourse.objects.create(user=self.request.user, course_id=instance.id)
        return Response(serializer.data)

    def get_serializer_context(self):
        user = self.request.user
        if user.is_anonymous:
            return {"user": None, "request": self.request}
        return {"user": user, "request": self.request}


class BuyCourseAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        user = self.request.user
        course_id = request.data['course']
        course = Course.objects.get(pk=course_id)
        amount = course.get_price()
        check_bought = UserBuyCourse.objects.filter(course_id=course_id, user_id=user.id).count()
        if check_bought > 0:
            return Response({
                "result": False,
                "message": "Already bought",
            }, status=status.HTTP_406_NOT_ACCEPTABLE)

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
        
        UserBuyCourse.objects.create(user=user, course_id=course_id, money='0')
        Notification.objects.create(user=user, reference=course_id, type='1')
        return Response({
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

        if errorCode == "0":
            query = MoMoQueryStatusService(partnerRefId=partnerRefId, requestId=requestId)
            response = query.call()
            response_data = response.content.decode("utf-8")
            json_response = json.loads(response_data)
            if json_response["data"]["status"] == 0:
                amount = json_response["data"]["amount"]
                course = Course.objects.get(pk=course_id)
                Notification.objects.create(user=user, reference=course_id, type='1')
                try:
                    UserBuyCourse.objects.get(user=user, course_id=course_id)
                except UserBuyCourse.DoesNotExist:
                    instance = UserBuyCourse.objects.create(user=user, course_id=course_id, money=amount)
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


class FavoriteCourseAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        course_id = self.request.data.get('courseId', None)
        action = self.request.data.get('action', 'add')
        user = self.request.user
        if action == 'add':
            FavoriteCourse.objects.create(user=user, course_id=course_id)
        else:
            instance = FavoriteCourse.objects.get(user=user, course_id=course_id)
            instance.delete()
        return Response({"result": True}, status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        user = self.request.user
        favorite_course = FavoriteCourse.objects.filter(user=user).order_by('-add_date')

        return Response(
            data=FavoriteCourseSerializer(
                instance=favorite_course, context=self.get_serializer_context(), many=True
            ).data, status=status.HTTP_200_OK
        )

    def delete(self, request, *args, **kwargs):
        fav_course_id = self.request.data.get('id')
        instance = FavoriteCourse.objects.get(pk=fav_course_id)
        instance.delete()
        return Response({"Result": True}, status=status.HTTP_200_OK)