# Generated by Django 3.0.7 on 2020-09-11 12:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0043_auto_20200910_1640'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='userbuycourse',
            unique_together=set(),
        ),
    ]
