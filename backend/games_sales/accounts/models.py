from django.contrib.auth import password_validation
from django.contrib.auth.tokens import default_token_generator
from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class PasswordConfirmError(Exception):
    pass


class AccountManager(BaseUserManager):
    def create_user(
            self, email,
            username,
            password=None,
            password_confirmation=None,
            social_login=True
    ):
        if email is None:
            raise TypeError('You need to enter your email.')

        if not social_login:
            password_validation.validate_password(password)

        if password != password_confirmation:
            raise PasswordConfirmError('Passwords must match.')

        user = self.model(email=self.normalize_email(email), username=username)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(email, username, password, password)

        user.is_verified = True
        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True

        user.save()
        return user


class Account(AbstractBaseUser):
    username = models.CharField(
        max_length=30, unique=True
    )
    email = models.EmailField(
        max_length=255, unique=True,
        verbose_name='email'
    )

    date_joined = models.DateTimeField(
        verbose_name="date joined",
        auto_now_add=True
    )
    last_login = models.DateTimeField(
        verbose_name="last login",
        auto_now=True
    )

    is_active = models.BooleanField(default=True)  # Later change to False if not verified
    is_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = AccountManager()

    def verify(self, token):
        msg = ''

        if default_token_generator.check_token(self, token):
            if not self.is_verified:
                self.is_active = True
                self.is_verified = True
                self.save()
                msg = 'Email has successfully been verified.'
            else:
                msg = 'Email has already been verified.'
        else:
            msg = 'Token has expired.'

        return self.is_verified, msg

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    def __str__(self):
        return f'{self.email}'
