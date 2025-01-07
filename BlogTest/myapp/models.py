from django.db import models
from django.contrib.auth.models import User
# from django.contrib.auth.models import AbstractUser


# Create your models here.
# class User(AbstractUser):
#     name = models.CharField(max_length=100, unique=True)

#     # Override the groups field's related_name to avoid conflicts
#     groups = models.ManyToManyField(
#         'auth.Group',
#         related_name='myapp_user_set',  # Add a unique related name to avoid clash
#         blank=True
#     )

#     # Override the user_permissions field's related_name to avoid conflicts
#     user_permissions = models.ManyToManyField(
#         'auth.Permission',
#         related_name='myapp_user_set',  # Add a unique related name to avoid clash
#         blank=True
#     )


class BlogPost(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=250, unique=True)
    subtitle = models.CharField(max_length=250)
    date = models.DateField(auto_now_add=True)
    body = models.TextField()

    def __str__(self):
        return self.title
