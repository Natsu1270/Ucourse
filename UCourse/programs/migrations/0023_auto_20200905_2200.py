# Generated by Django 3.0.7 on 2020-09-05 15:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0022_userbuyprogram_money'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='field',
            name='code',
        ),
        migrations.RemoveField(
            model_name='program',
            name='code',
        ),
    ]
