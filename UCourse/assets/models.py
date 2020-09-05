from django.db import models
from django.utils import timezone
from django.conf import settings


class Asset(models.Model):
    VIDEO = "video"
    SOUND = "sound"
    DOCUMENT = "doc"
    IMAGE = "img"

    LESSON_MATERIAL_TYPES = [
        (VIDEO, "video"),
        (SOUND, "sound"),
        (DOCUMENT, "doc"),
        (IMAGE, "img"),
    ]

    name = models.CharField(max_length=255)
    info = models.TextField(blank=True, null=True)
    resource_type = models.CharField(max_length=10, choices=LESSON_MATERIAL_TYPES)
    content = models.FileField(upload_to="resource/assets/")
    status = models.BooleanField(default=True)
    created_date = models.DateTimeField(default=timezone.now)
    created_by = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True
    )

    def __str__(self):
        return self.name
