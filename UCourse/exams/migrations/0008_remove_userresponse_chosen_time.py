# Generated by Django 3.0.3 on 2020-04-14 08:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('exams', '0007_auto_20200410_1817'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userresponse',
            name='chosen_time',
        ),
    ]