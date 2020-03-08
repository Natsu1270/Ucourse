from django.test import TestCase
from django.urls import reverse
from .models import Course, CourseDetail

from rest_framework import status
from rest_framework.test import APIClient


COURSE_LIST_URL = reverse('courses:course-list')


class CourseModelTest(TestCase):

    def test_create_course_detail_after_creating_course(self):
        """Test course detail is automatically created associating with course"""
        title = 'Javascript'
        code = 'JS1'
        level = 'bg'
        status = 'active'
        course = Course.objects.create(
            title=title,
            code=code,
            level=level,
            status=status
        )
        course_detail = CourseDetail.objects.get(course=course)

        self.assertEqual(course_detail.course.id, course.id)
        self.assertEqual(course_detail.verbose_name, course.title)


class PublicCourseAPITest(TestCase):
    """Test public api endpoints for course"""
    def setUp(self):
        self.client = APIClient()

    def test_get_course_list(self):
        """Test get course list api"""
        res = self.client.get(COURSE_LIST_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_get_course_detail(self):
        """Test course detail api"""
        course = Course.objects.create(title='Test course',code='T1', level='bg',status='active')
        res = self.client.get(reverse('courses:course-detail', kwargs={'pk': course.id}))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data.get('title'), course.title)

