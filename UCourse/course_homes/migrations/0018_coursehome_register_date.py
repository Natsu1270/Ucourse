# Generated by Django 3.0.3 on 2020-06-05 15:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course_homes', '0017_auto_20200531_2241'),
    ]

    operations = [
        migrations.AddField(
            model_name='coursehome',
            name='register_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
