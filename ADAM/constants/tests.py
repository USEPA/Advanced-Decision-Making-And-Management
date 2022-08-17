# tests.py (constants)
# !/usr/bin/env python3
# coding=utf-8
# ruiz-mercado.gerardo@epa.gov
# py-lint: disable=C0301
"""
This file houses test cases for the constants module.

Available functions:
- None
"""

import django
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.mail import EmailMultiAlternatives
from django.test import TestCase
from accounts.models import User
from constants.utils import split_email_list, is_epa_email, non_epa_email_message, \
    create_qt_email_message, xstr, is_float


class TestUtils(TestCase):
    """Test utils."""

    if django.VERSION[:2] >= (1, 7):
        # Django 1.7 requires an explicit setup() when running tests in PTVS.
        @classmethod
        def setUpClass(cls):
            """Tests for the application views."""
            super(TestUtils, cls).setUpClass()
            django.setup()

    def setUp(self):
        """Prepare various objects for this class of tests."""
        self.test_str = 'Test'
        self.user = User.objects.create_user(username='testuser',
                                             password='12345')
        self.client.login(username='testuser', password='12345')
        self.file = SimpleUploadedFile('test.txt', b'This is a test file.')
        self.excel_file = SimpleUploadedFile('test.xlsx',
                                             b'This is a test file.')

    def test_split_email_list_pass_one(self):
        """Runs the char split on an email that will be equal."""
        self.assertEqual(split_email_list("t;e,s\tt@t|est.com"),
                         ['t', 'e', 's', 't@t', 'est.com'])

    def test_split_email_list_fail_one(self):
        """Runs the char split on an email that will not be equal."""
        self.assertNotEqual(split_email_list("t;e,s\tt@t|est.com"),
                            ['t', 'e', 's', 't@test.com'])

    def test_is_epa_email_pass_one(self):
        """
        Runs the test to check if an email address is in the right format to
        be an epa email address.
        """
        self.assertEqual(is_epa_email("test@epa.gov"), True)

    def test_is_epa_email_fail_one(self):
        """
        Runs the test to check if an email address is in the right format to
        be an epa email address.
        """
        self.assertEqual(is_epa_email("test@test.com"), False)

    def test_is_epa_email_fail_two(self):
        """
        Runs the test to check if an email address is in the right format to be
        an epa email address.
        """
        self.assertEqual(is_epa_email("test@test.gov"), False)

    def test_is_epa_email_fail_three(self):
        """
        Runs the test to check if an email address is in the right format to
        be an epa email address.
        """
        self.assertEqual(is_epa_email("test@epa.com"), False)

    def test_is_epa_email_fail_seven(self):
        """
        Runs the test to check if an email address is in the right format to
        be an epa email address.
        """
        self.assertEqual(is_epa_email("test@Aepa.gov"), False)

    def test_is_epa_email_fail_eight(self):
        """
        Runs the test to check if an email address is in the right format to
        be an epa email address.
        """
        self.assertEqual(is_epa_email("test@repa.govR"), False)

    def test_is_epa_email_fail_nine(self):
        """
        Runs the test to check if an email address is in the right format
        to be an epa email address.
        """
        self.assertEqual(is_epa_email("test@4epa.gov"), False)

    def test_non_epa_email_message_fail_one(self):
        """
        Runs the test to check if an email address is not EPA that it sends
        the correct message.
        """
        self.assertIn("""Email list may only contain @epa.gov addresses.""",
                      non_epa_email_message("test@test.com"),
                      msg=None)

    def test_create_qt_email_message(self):
        """Returns EmailMultiAlternatives object."""
        to_emails = ["testTo@test.com"]
        self.assertIsInstance(create_qt_email_message("email Subject",
                                                      "text content",
                                                      "testFrom@test.com",
                                                      to_emails, None, None),
                              EmailMultiAlternatives,
                              msg=None)

    def test_xstr_one(self):
        """
        Test the method that Checks for and replaces None objects with empty
        strings.
        """
        self.assertEqual(xstr(None), "")

    def test_xstr_two(self):
        """
        Test the method that Checks for and replaces None objects with empty
        strings.
        """
        self.assertEqual(xstr("test"), "test")

    def test_is_float_one(self):
        """Test the is float method with a float."""
        val_str = "1.2"
        results = is_float(val_str)
        # Print(results).
        self.assertEqual(results, True)

    def test_is_float_two(self):
        """Test the is float method with a char string."""
        val_str = "notAFloat"
        results = is_float(val_str)
        # Print(results).
        self.assertEqual(results, False)
