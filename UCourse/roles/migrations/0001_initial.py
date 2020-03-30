# Generated by Django 3.0.3 on 2020-03-26 13:50

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, unique=True)),
                ('code', models.CharField(choices=[('AD', 'Admin'), ('TC', 'Teacher'), ('SD', 'Student'), ('AS', 'Teacher Assistant')], max_length=2, unique=True)),
                ('created_date', models.DateField(default=datetime.date.today)),
            ],
        ),
    ]
