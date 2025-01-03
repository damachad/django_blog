from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView, DeleteView, UpdateView
from django.urls import reverse_lazy
from .models import BlogPost
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


class BlogPostUpdateView(UpdateView):
    model = BlogPost
    fields = ['title', 'subtitle', 'body']
    success_url = reverse_lazy("postlist")


class BlogPostDeleteView(DeleteView):
    model = BlogPost
    success_url = reverse_lazy("postlist")

