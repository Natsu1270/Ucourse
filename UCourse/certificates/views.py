import base64
import datetime
import io
from django.db.models import Q
from django.core.files.base import ContentFile

from rest_framework import generics, permissions, status
from rest_framework.response import Response
import os
from django.conf import settings
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
from django.contrib.staticfiles import finders

from certificates.models import StudentCertificate
from courses.models import UserCourse
from courses.serializers import UserCourseSerializer
from programs.models import StudentProgram, Program
from programs.serializers import StudentProgramSerializer
from services.mail_service import send_mail_with_attachments, send_mail_with_attachment
from . import serializers


def link_callback(uri, rel):
    """
    Convert HTML URIs to absolute system paths so xhtml2pdf can access those
    resources
    """
    result = finders.find(uri)
    if result:
        if not isinstance(result, (list, tuple)):
            result = [result]
        result = list(os.path.realpath(path) for path in result)
        path = result[0]
    else:
        sUrl = settings.STATIC_URL  # Typically /static/
        sRoot = settings.STATIC_ROOT  # Typically /home/userX/project_static/
        mUrl = settings.MEDIA_URL  # Typically /media/
        mRoot = settings.MEDIA_ROOT  # Typically /home/userX/project_static/media/

        if uri.startswith(mUrl):
            path = os.path.join(mRoot, uri.replace(mUrl, ""))
        elif uri.startswith(sUrl):
            path = os.path.join(sRoot, uri.replace(sUrl, ""))
        else:
            return uri

    # make sure that file exists
    if not os.path.isfile(path):
        raise Exception(
            'media URI must start with %s or %s' % (sUrl, mUrl)
        )
    return path


def generate_certificate(template, context):
    html = template.render(context)
    result = io.BytesIO()
    pdf = pisa.pisaDocument(
        io.BytesIO(html.encode("UTF-8")), dest=result,
        link_callback=link_callback, encoding='UTF-8'
    )
    return pdf, result


class GenerateCertificate(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        template = get_template('course-certificate-template.html')
        name = self.request.query_params['name']
        course_name = self.request.query_params['courseName']
        rank = self.request.query_params['rank']
        context = {
            'name': name,
            'course_name': course_name,
            'rank': rank,
            'date': datetime.date.today()
        }
        pdf, result = generate_certificate(template, context)
        if not pdf.err:
            filename = "{0}-{1}_Certificate.pdf".format(name, course_name)
            response = HttpResponse(result.getvalue(), content_type='application/pdf')
            response['Content-Disposition'] = 'attachment; filename={0}'.format(filename)
            return response
            # return HttpResponse(result.getvalue(), content_type='application/pdf')


class HandoutCertificate(generics.GenericAPIView):

    def post(self, request, *args, **kwargs):
        email = self.request.data['email']
        course_home_id = self.request.data['courseHomeId']
        student_id = self.request.data['studentId']
        course_id = self.request.data['courseId']
        file = self.request.data['file']
        student_course_id = self.request.data['id']
        course_name = self.request.data['courseName']
        student_name = self.request.data['studentName']

        send_mail_with_attachments(
            subject="[Certificate Of Completion]",
            body="""Hi {0}, 
         Congratulations on completing course {1}, 
         we are honored to give you the certificate, 
         
         Thanks,
         UCOURSE CEO
                 """.format(
                student_name, course_name),
            send_from="ucourse.service@gmail.com",
            send_to=[email],
            cc=["hungduy1270@gmail.com", "1610107@hcmut.edu.vn"],
            attachments=[file]
        )
        student_certificate = StudentCertificate.objects.filter(
            student_id=student_id, course_id=course_id, course_home_id=course_home_id
        )
        if student_certificate.count() > 0:
            student_certificate = student_certificate[0]
            student_certificate.file = file
            student_certificate.received_date = datetime.date.today()
            student_certificate.save()
        else:
            StudentCertificate.objects.create(
                student_id=student_id, course_id=course_id, course_home_id=course_home_id, file=file
            )

        instance = UserCourse.objects.get(pk=student_course_id)
        instance.received_certificate = True
        instance.save()

        return HttpResponse({
            "result": True
        }, status=status.HTTP_200_OK)


class GetStudentCertificate(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        course_id = self.request.query_params.get('courseId')
        class_id = self.request.query_params.get('courseHomeId')
        student = self.request.user
        try:
            instance = StudentCertificate.objects.get(Q(student_id=student.id) & Q(course_home_id=class_id))
        except StudentCertificate.DoesNotExist:
            return Response(
                {
                    "result": False
                },
                status=status.HTTP_200_OK
            )
        return Response(
            data=serializers.StudentCertificateSerializer(
                instance=instance, context=self.get_serializer_context()).data,
            status=status.HTTP_200_OK
        )


class RequestProgramCertificate(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        student = self.request.user
        program_id = self.request.query_params.get('programId')
        program = Program.objects.get(pk=program_id)
        program_courses = program.program_course.all()
        student_courses = []
        for course in program_courses:
            try:
                instance = UserCourse.objects.get(Q(user_id=student.id) & Q(course_id=course.id))
                student_courses.append(instance)
            except UserCourse.DoesNotExist:
                pass

        is_completed_all = len(student_courses) == len(program_courses) and all(
            course.status == 'pass' and course.is_summarised for course in student_courses
        )

        if is_completed_all:
            template = get_template('course-certificate-template.html')
            context = {
                'name': student.user_profile.fullname,
                'date': datetime.date.today()
            }
            pdf, result = generate_certificate(template, context)
            file = None
            if not pdf.err:
                filename = "{0}_Program_Certificate.pdf".format(student.username)
                file = result.getvalue()
                send_mail_with_attachment(
                    subject="[Certificate Of Completion]",
                    body=
                    """
Hi {0}, 
Congratulations on completing program {1}, 
we are honored to give you the certificate, 

Thanks,
UCOURSE CEO
                    """.format(student.user_profile.fullname, program.name),
                    send_from="ucourse.service@gmail.com",
                    send_to=[student.email],
                    cc=["hungduy1270@gmail.com", "1610107@hcmut.edu.vn"],
                    attachment=file,
                    filename=filename
                )
            try:
                student_program = StudentProgram.objects.get(
                    student_id=student.id, program_id=program_id
                )
                student_program.status = 'completed'
                student_program.completed_date = datetime.date.today()
                student_program.received_certificate = True
                file_content = ContentFile(base64.b64decode(file))
                name = "{0}_Program_Certificate.pdf".format(student.username)
                student_program.file.save(name=name, content=file_content, save=False)
                student_program.save()

            except StudentProgram.DoesNotExist:
                student_program = StudentProgram.objects.create(
                    student_id=student.id, program_id=program_id, completed_date=datetime.date.today(),
                    status='completed', received_certificate=True, file=file
                )
            return Response({
                "result": True,
                "message": "Success",
                "resultCode": 1
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                "result": False,
                "message": "Not completed all courses",
                "resultCode": -1
            }, status=status.HTTP_200_OK)


class GetAllCourseCertificate(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        student = self.request.user
        instance = StudentCertificate.objects.filter(Q(student_id=student.id))
        return Response(
            data=serializers.StudentCertificateSerializer(
                instance=instance, context=self.get_serializer_context(), many=True).data,
            status=status.HTTP_200_OK
        )


class GetALLProgramCertificate(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        instance = StudentProgram.objects.all()
        return Response(
            data=StudentProgramSerializer(
                instance=instance, context=self.get_serializer_context(), many=True).data,
            status=status.HTTP_200_OK
        )