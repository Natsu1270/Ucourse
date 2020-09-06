from django.db import models
from django.utils import timezone
from django.conf import settings


class Resource(models.Model):
    VIDEO = 'video'
    SOUND = 'sound'
    DOCUMENT = 'doc'
    IMAGE = 'img'

    LESSON_MATERIAL_TYPES = [
        (VIDEO, 'video'),
        (SOUND, 'sound'),
        (DOCUMENT, 'doc'),
        (IMAGE, 'img'),
    ]

    name = models.CharField(max_length=255)
    icon = models.ImageField(upload_to='resource/icon', null=True, blank=True)
    info = models.TextField(blank=True, null=True)
    resource_type = models.CharField(max_length=10, choices=LESSON_MATERIAL_TYPES)
    content = models.FileField(upload_to='resource/upload/%Y/%m/%d/')
    status = models.BooleanField(default=True)
    allow_download = models.BooleanField(default=False)
    created_date = models.DateTimeField(default=timezone.now)
    created_by = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True
    )

    class Meta:
        db_table = 'Resource'
        
    def __str__(self):
        return self.name
