# Generated by Django 3.0.3 on 2020-03-26 13:50

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CourseDetail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('verbose_name', models.CharField(max_length=255)),
                ('short_description', models.CharField(blank=True, max_length=255)),
                ('full_description', models.TextField(blank=True, null=True)),
                ('benefits', models.TextField(blank=True, help_text='What you will learn', null=True)),
                ('open_date', models.DateField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('code', models.CharField(max_length=50, unique=True)),
                ('level', models.CharField(choices=[('bg', 'Beginner'), ('im', 'Intermediate'), ('av', 'Advanced'), ('al', 'All level')], max_length=2)),
                ('status', models.CharField(choices=[('active', 'Active'), ('closed', 'Closed'), ('full', 'Full'), ('inactive', 'Inactive')], max_length=10)),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_date', models.DateTimeField(auto_now=True, null=True)),
                ('created_by_name', models.CharField(blank=True, max_length=255, null=True)),
                ('course_detail', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='courses.CourseDetail')),
            ],
        ),
    ]