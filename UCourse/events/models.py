from django.db import models
from django.conf import settings
from django.utils import timezone
from django.utils.text import slugify


from datetime import date


class Event(models.Model):
    title = models.CharField(max_length=50, blank=True)
    slug = models.SlugField(unique=True, blank=True, null=True)
    img = models.ImageField(upload_to='event/img', null=True, blank=True)
    content = models.CharField(max_length=250, blank=True)
    location = models.CharField(max_length=50, blank=True)
    created_date = models.DateTimeField(default=timezone.now, null=True)
    modified_date = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        db_table = 'Event'

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Event, self).save(*args, **kwargs)
