# Generated by Django 3.0.3 on 2020-04-17 13:23

import course_homes.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course_homes', '0003_auto_20200417_2009'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topicasset',
            name='file',
            field=models.FileField(upload_to=course_homes.models.asset_upload_path),
        ),
    ]
