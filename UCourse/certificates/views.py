import datetime
import io
from django.core.mail import EmailMessage

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
from services.mail_service import send_mail_with_attachments


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


class GenerateCertificate(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        template = get_template('course-certificate-template.html')
        name = self.request.query_params['name']
        course_name = self.request.query_params['courseName']
        rank = self.request.query_params['rank']
        context = {
            # 'pagesize': 'A3',
            'name': name,
            'course_name': course_name,
            'rank': rank,
            'date': datetime.date.today()
        }
        html = template.render(context)
        result = io.BytesIO()
        pdf = pisa.pisaDocument(
            io.BytesIO(html.encode("UTF-8")), dest=result,
            link_callback=link_callback, encoding='UTF-8'
        )
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

        StudentCertificate.objects.create(student_id=student_id, course_id=course_id, course_home_id=course_home_id,
                                          file=file)

        instance = UserCourse.objects.get(pk=student_course_id)
        instance.received_certificate = True
        instance.save()

        return HttpResponse({
            "result": True
        }, status=status.HTTP_200_OK)
