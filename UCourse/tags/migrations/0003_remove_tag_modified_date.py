# Generated by Django 3.0.3 on 2020-03-29 13:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0002_auto_20200326_2050'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tag',
            name='modified_date',
        ),
    ]