from rest_framework import serializers

from .models import Tag, SearchKeyWord


class TagSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    created_by = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Tag
        fields = (
            'id', 'name', 'created_date','modified_date', 'created_by',
        )
        read_only_fields = ('created_date', 'modified_date')


class SearchKeyWordSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = SearchKeyWord
        fields = (
            'id', 'name', 'count'
        )