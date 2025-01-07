from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView, DeleteView, UpdateView
from django.urls import reverse_lazy
from .models import BlogPost, User
import datetime


# Create your views here.
class BlogPostListView(ListView):
    model = BlogPost
    

class BlogPostDetailView(DetailView):
    model = BlogPost


class BlogPostCreateView(CreateView):
    model = BlogPost
    fields = ['title', 'subtitle', 'body']
    def form_valid(self, form):

        form.instance.date = datetime.date.today()
        return super().form_valid(form)


class UserCreateView(CreateView):
    model = User
    fields = ['username', 'password']
    success_url = reverse_lazy("login")


class BlogPostUpdateView(UpdateView):
    model = BlogPost
    fields = ['title', 'subtitle', 'body']
    success_url = reverse_lazy("home")


class BlogPostDeleteView(DeleteView):
    model = BlogPost
    success_url = reverse_lazy("home")

