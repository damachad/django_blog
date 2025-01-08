from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class CustomUser(AbstractUser):
    profile_picture = models.ImageField(upload_to='profile_pictures/', default='profile_pictures/default.jpg')
    bio = models.TextField(blank=True, null=True)


class BlogPost(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=250, unique=True)
    subtitle = models.CharField(max_length=250)
    creation_date = models.DateTimeField(auto_now_add=True)
    modification_date = models.DateTimeField(auto_now=True)
    body = models.TextField()

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    creation_date = models.DateTimeField(auto_now_add=True)
    modification_date = models.DateTimeField(auto_now=True)
    content = models.TextField(max_length=250)

    def __str__(self):
        return f"Comment by {self.author} on {self.post}"
