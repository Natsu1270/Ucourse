# Generated by Django 3.0.3 on 2020-04-03 08:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0008_auto_20200403_1250'),
    ]

    operations = [
        migrations.AddField(
            model_name='program',
            name='slug',
            field=models.SlugField(blank=True, null=True, unique=True),
        ),
    ]
