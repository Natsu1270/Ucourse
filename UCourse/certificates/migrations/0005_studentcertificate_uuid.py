# Generated by Django 3.0.7 on 2020-09-10 14:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('certificates', '0004_studentcertificate_program'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentcertificate',
            name='uuid',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]