# Generated by Django 3.0.3 on 2020-05-15 16:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('forums', '0002_thread_view'),
    ]

    operations = [
        migrations.RenameField(
            model_name='thread',
            old_name='info',
            new_name='content',
        ),
    ]