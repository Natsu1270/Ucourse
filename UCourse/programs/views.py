from rest_framework import generics
from rest_framework.response import Response

from .serializers import FieldSerializer, FieldMinSerializer
from .models import Field


class FieldListAPI(generics.ListAPIView):
    serializer_class = FieldSerializer
    queryset = Field.objects.all().order_by('name')


class FieldListMinAPI(generics.ListAPIView):
    serializer_class = FieldMinSerializer
    queryset = Field.objects.all().order_by('name')


class FieldDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = "slug"
    serializer_class = FieldSerializer
    queryset = Field.objects.all().order_by('name')
