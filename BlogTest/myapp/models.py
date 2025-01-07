from django.db import models
from django.contrib.auth.models import User


class BlogPost(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=250, unique=True)
    subtitle = models.CharField(max_length=250)
    date = models.DateField(auto_now_add=True)
    body = models.TextField()

    def __str__(self):
        return self.title
