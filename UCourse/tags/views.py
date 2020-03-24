from rest_framework import generics
from .models import SearchKeyWord
from .serializers import SearchKeyWordSerializer


class SearchKeyWordAPI(generics.ListAPIView):
    serializer_class = SearchKeyWordSerializer

    def get_queryset(self):
        return SearchKeyWord.objects.all().order_by('-count')[:5]
