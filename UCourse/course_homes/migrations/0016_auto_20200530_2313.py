# Generated by Django 3.0.3 on 2020-05-30 16:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0015_course_fee_type'),
        ('profiles', '0001_initial'),
        ('course_homes', '0015_learningtopic_info'),
    ]

    operations = [
        migrations.AddField(
            model_name='coursehome',
            name='end_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='coursehome',
            name='expected_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='coursehome',
            name='open_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='coursehome',
            name='over_admission_days',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='coursehome',
            name='teacher',
            field=models.ForeignKey(blank=True, limit_choices_to={'is_teacher': True}, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='teacher_course', to='profiles.Profile'),
        ),
        migrations.AlterField(
            model_name='coursehome',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='c_homes', to='courses.Course'),
        ),
        migrations.AlterField(
            model_name='coursehome',
            name='status',
            field=models.CharField(choices=[('open', 'Active'), ('closed', 'Closed'), ('full', 'Full')], default='open', max_length=10),
        ),
    ]
