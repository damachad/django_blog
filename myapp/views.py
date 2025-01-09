from django.views.generic import ListView, DetailView, FormView
from django.views.generic.edit import CreateView, DeleteView, UpdateView
from django.urls import reverse_lazy
from .models import BlogPost, Comment, CustomUser
from .forms import CommentForm, CustomUserChangeForm, CustomUserCreationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.views import PasswordChangeView
from datetime import timedelta


class BlogPostListView(ListView):
    model = BlogPost
    

class CommentDeleteView(LoginRequiredMixin, DeleteView):
    model = Comment

    def get_queryset(self):
        """
        Restrict the queryset to comments on posts authored by the logged-in user.
        """
        return Comment.objects.filter(post__author=self.request.user)

    def get_success_url(self):
        return reverse_lazy('postdetail', kwargs={'pk': self.get_object().post.pk})


class BlogPostDetailView(DetailView, FormView):
    model = BlogPost
    form_class = CommentForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['comments'] = self.object.comments.all()
        context['form'] = self.get_form()

        time_difference = self.object.modification_date - self.object.creation_date
        context['edited_post'] = time_difference > timedelta(seconds=1)

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

    def get_success_url(self):
        return reverse_lazy("postdetail", kwargs={'pk': self.get_object().pk})


class BlogPostDeleteView(LoginRequiredMixin, DeleteView):
    model = BlogPost
    success_url = reverse_lazy("home")


class UserCreateView(CreateView):
    form_class = CustomUserCreationForm
    template_name = 'registration/register.html'
    success_url = reverse_lazy("login")

class CustomUserDetailView(LoginRequiredMixin, DetailView):
    model = CustomUser
    template_name = 'myapp/profile_detail.html'

    def get_object(self, queryset=None):
        """
        Ensure the logged-in user can view their own profile.
        """
        return self.request.user

class CustomUserUpdateView(LoginRequiredMixin, UpdateView):
    model = CustomUser
    template_name = 'myapp/profile_edit.html'
    form_class = CustomUserChangeForm
    success_url = reverse_lazy('profile_detail')

    def get_object(self, queryset=None):
        return self.request.user
    
class CustomPasswordChangeView(PasswordChangeView):
    form_class = PasswordChangeForm
    template_name = 'registration/password_change.html'
    success_url = reverse_lazy("profile_edit")
    