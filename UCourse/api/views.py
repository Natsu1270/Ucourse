from django.db.models import Q

from rest_framework import views,status
from rest_framework.response import Response

from api.utils import uc_response, create_search_keyword
from courses.models import Course
from programs.models import Program
from courses.serializers import CourseSerializer
from programs.serializers import ProgramSerializer


class SearchAPI(views.APIView):

    def get(self, request):
        query = request.query_params.get('query', None)
        courses = Course.objects.all()
        programs = Program.objects.all()
        create_search_keyword(query)
        if query:
            courses = courses.filter(Q(title__icontains=query))
            programs = programs.filter(name__icontains=query)
        data = {
            "courses": CourseSerializer(instance=courses, many=True).data,
            "programs": ProgramSerializer(instance=programs, many=True).data
        }

        return Response(uc_response(data=data,result=True,error=None, message='OK',status_code=200),status=status.HTTP_200_OK)

