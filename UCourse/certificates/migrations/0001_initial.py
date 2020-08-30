# Generated by Django 3.0.7 on 2020-08-30 04:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('courses', '0031_usercourse_is_summarised'),
        ('course_homes', '0031_auto_20200829_1216'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Certificate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('code', models.CharField(max_length=10, unique=True)),
                ('certificate_type', models.CharField(blank=True, max_length=50, null=True)),
                ('effective_time', models.IntegerField()),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='StudentCertificate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='certificates/file')),
                ('received_date', models.DateField(default=django.utils.timezone.now)),
                ('course', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='courses.Course')),
                ('course_home', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='course_homes.CourseHome')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
