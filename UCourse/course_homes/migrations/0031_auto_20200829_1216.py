# Generated by Django 3.0.7 on 2020-08-29 05:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('course_homes', '0030_auto_20200826_0924'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentCourseHome',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('final_score', models.FloatField(blank=True, null=True)),
                ('status', models.CharField(blank=True, choices=[('pass', 'Pass course'), ('fail', 'Fail course'), ('on_going', 'On Going')], max_length=10, null=True)),
                ('rank', models.CharField(blank=True, choices=[('medium', 'Medium'), ('good', 'Good'), ('xgood', 'Very good')], max_length=10, null=True)),
                ('course_home', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='course_homes.CourseHome')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='coursehome',
            name='students',
            field=models.ManyToManyField(blank=True, related_name='course_homes', through='course_homes.StudentCourseHome', to=settings.AUTH_USER_MODEL),
        ),

        migrations.AddField(
            model_name='coursehome',
            name='students',
            field=models.ManyToManyField(blank=True, related_name='course_homes',
                                         through='course_homes.StudentCourseHome', to=settings.AUTH_USER_MODEL),
        ),
    ]