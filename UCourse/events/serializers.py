from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    # user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    # fullname = serializers.CharField(read_only=True)
    # email = serializers.EmailField(read_only=True)
    #id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Event
        fields = ('title', 'content', 'img', 'location')
        read_only_fields = ('title', 'content', 'img', 'location')


class EventMinSerializer(serializers.ModelSerializer):
    # fullname = serializers.CharField(read_only=True)
    # email = serializers.EmailField(read_only=True)

    class Meta:
        model = Event
        fields = ('title', 'content', 'img', 'location', 'id')

    class EventDetailSerializer(serializers.ModelSerializer):
        id = serializers.IntegerField(read_only=True)
        title = serializers.StringRelatedField(read_only=True)
        # event = EventSearchSerializer(many=True, read_only=True)
        event_count = serializers.IntegerField(read_only=True)
        # is_my_program = serializers.SerializerMethodField()

        class Meta:
            model = Event
            fields = [
                'title', 'content', 'img', 'location'
            ]

    # def get_is_my_program(self, obj):
    #     user = self.context.get('user')
    #     return obj.user_buy.filter(pk=user.id).count() > 0