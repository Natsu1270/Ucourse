# Generated by Django 3.0.3 on 2020-08-09 09:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('course_homes', '0020_auto_20200804_2117'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='topicasset',
            name='icon',
        ),
    ]
