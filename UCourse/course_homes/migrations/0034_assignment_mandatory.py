# Generated by Django 3.0.7 on 2020-09-06 03:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course_homes', '0033_coursehome_exam_percentage'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignment',
            name='mandatory',
            field=models.BooleanField(blank=True, default=True, null=True),
        ),
    ]
