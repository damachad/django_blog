from django.views.generic import ListView, DetailView
from .models import BlogPost


# Create your views here.
class BlogPostListView(ListView):
    model = BlogPost
    

class BlogPostDetailView(DetailView):
    model = BlogPost

