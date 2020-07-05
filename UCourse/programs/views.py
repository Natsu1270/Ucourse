from rest_framework import generics, permissions, status
from rest_framework.response import Response

from courses.models import Course
from .serializers import FieldSerializer, FieldMinSerializer, ProgramDetailSerializer, ProgramSerializer
from .models import Field, Program, UserBuyProgram


class FieldListAPI(generics.ListAPIView):
    serializer_class = FieldSerializer
    queryset = Field.objects.all().order_by('name')


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

    def get_serializer_context(self):
        return {"user": self.request.user}


class BuyProgramAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        user = request.user
        program_id = request.data['program_id']
        UserBuyProgram.objects.create(user=user, program_id=program_id)
        program = Program.objects.get(pk=program_id)
        program_courses = program.program_course.all()
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