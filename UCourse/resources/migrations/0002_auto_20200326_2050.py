# Generated by Django 3.0.3 on 2020-03-26 13:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('resources', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('lessons', '0002_auto_20200326_2050'),
    ]

    operations = [
        migrations.AddField(
            model_name='resource',
            name='created_by',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='resource',
            name='lesson',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='lessons.Lesson'),
        ),
    ]
