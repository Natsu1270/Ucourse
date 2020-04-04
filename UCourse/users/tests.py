from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient

from .serializers import UserSerializer
from profiles.models import Profile

USER_LIST_URL = reverse('users:user-list')
REGISTER_URL = reverse('users:register')
LOGIN_URL = reverse('users:login')
LOGOUT_URL = reverse('users:knox-logout')
USER_DETAIL_URL = reverse('users:user-detail')
USER_UPDATE_URL = reverse('users:user-update')


class UserModelTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.admin = get_user_model().objects.create_superuser(
            'admin@gmail.com',
            '1212qwqw'
        )
        cls.user = get_user_model().objects.create_user(
            'user@gmail.com',
            '1212qwqw'
        )

    def setUp(self):
        self.admin.refresh_from_db()
        self.user.refresh_from_db()

    def test_str(self):
        """Test display from user model"""
        self.assertEqual(str(self.user), 'user@gmail.com')
        self.assertEqual(str(self.admin), 'admin@gmail.com')

    def test_create_admin(self):
        """Test create superuser"""
        self.assertTrue(self.admin.is_staff)
        self.assertTrue(self.admin.is_superuser)


class PublicUserAPITest(TestCase):
    """Test public api for user"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            username="user1",
            email="user1@gmail.com",
            password="1212qwqw"
        )

    def test_get_user_list(self):
        """Test get list user API"""
        res = self.client.get(USER_LIST_URL)
        users = get_user_model().objects.all()
        serializer = UserSerializer(users, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_user_register(self):
        """Test user register api"""
        payload = {
            "username": "a",
            "email": "a@gmail.com",
            "password": "1212qwqw"
        }
        res = self.client.post(REGISTER_URL, payload)
        user = get_user_model().objects.get(email=payload["email"])
        profile = Profile.objects.get(user=user)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertIsNotNone(user)
        self.assertIsNotNone(profile)
        self.assertEqual(str(profile), payload["email"])

    def test_user_login_with_email(self):
        """Test user login with email api"""
        payload = {
            "username": "user1@gmail.com",
            "password": "1212qwqw"
        }
        res = self.client.post(LOGIN_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_user_login_with_username(self):
        """Test user login with username api"""
        payload = {
            "username": "user1",
            "password": "1212qwqw"
        }
        res = self.client.post(LOGIN_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_user_login_with_wrong_credentials(self):
        """Test user login api"""
        payload = {
            "username": "user1@gmail.com",
            "password": "1212"
        }
        res = self.client.post(LOGIN_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)


class PrivateUserAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            email='test@gmail.com', username='test', password='1212')
        self.client.force_authenticate(user=self.user)

    def test_retrieve_user_detail(self):
        """Test retrieve user detail"""
        res = self.client.get(USER_DETAIL_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['username'], self.user.username)
        self.assertFalse(res.data['is_social_account'])

    def test_update_user(self):
        payload = {'username': 'testtest',
                   'email': 'testtest@gmail.com',
                   'old_password': '1212',
                   'password': 'qwqw'}

        res = self.client.patch(USER_UPDATE_URL, payload)

        self.user.refresh_from_db()
        self.assertTrue(self.user.username, payload['username'])
        self.assertEqual(self.user.email, payload['email'])
        self.assertTrue(self.user.check_password(payload['password']))

        self.assertEqual(res.status_code, status.HTTP_200_OK)