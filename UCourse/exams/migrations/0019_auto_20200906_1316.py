# Generated by Django 3.0.7 on 2020-09-06 06:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exams', '0018_merge_20200906_1049'),
    ]

    operations = [
        migrations.AddField(
            model_name='exam',
            name='question_num',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='exam',
            name='pass_score',
            field=models.FloatField(blank=True, max_length=3, null=True),
        ),
    ]
