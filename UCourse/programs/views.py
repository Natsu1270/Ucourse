from rest_framework import generics

from .serializers import FieldSerializer, FieldMinSerializer, ProgramDetailSerializer, ProgramSerializer
from .models import Field, Program


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
