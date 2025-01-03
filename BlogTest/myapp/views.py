from django.shortcuts import render
from django.views.generic import ListView
from .models import BlogPost


# Create your views here.
class BlogPostListView(ListView):
    model = BlogPost
    