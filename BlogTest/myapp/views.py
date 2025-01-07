from django.views.generic import ListView, DetailView, FormView
from django.views.generic.edit import CreateView, DeleteView, UpdateView
from django.urls import reverse_lazy, reverse
from .models import BlogPost
from .forms import CommentForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.mixins import LoginRequiredMixin


class BlogPostListView(ListView):
    model = BlogPost
    

class BlogPostDetailView(DetailView, FormView):
    model = BlogPost
    form_class = CommentForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['comments'] = self.object.comments.all()
        context['form'] = self.get_form()
        return context

    def form_valid(self, form):
        comment = form.save(commit=False)
        comment.post = self.get_object()
        comment.author = self.request.user
        comment.save()
        return super().form_valid(form)

    def get_success_url(self):
        return reverse_lazy('postdetail', kwargs={'pk': self.get_object().pk})


class BlogPostCreateView(LoginRequiredMixin, CreateView):
    model = BlogPost
    fields = ['title', 'subtitle', 'body']

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)
    
    success_url = reverse_lazy("home")


class BlogPostUpdateView(LoginRequiredMixin, UpdateView):
    model = BlogPost
    fields = ['title', 'subtitle', 'body']
    success_url = reverse_lazy("home")


class BlogPostDeleteView(LoginRequiredMixin, DeleteView):
    model = BlogPost
    success_url = reverse_lazy("home")


class UserCreateView(CreateView):
    form_class = UserCreationForm
    template_name = 'registration/register.html'
    success_url = reverse_lazy("login")
