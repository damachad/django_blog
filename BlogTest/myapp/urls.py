from django.urls import path
from django.contrib.auth.views import LoginView
from .views import *

urlpatterns = [
    path("", BlogPostListView.as_view(), name="home"),
	path("register", UserCreateView.as_view(), name="register"),
	path("posts/<int:pk>", BlogPostDetailView.as_view(), name="postdetail"),
	path("posts/add", BlogPostCreateView.as_view(), name="addpost"),
	path("posts/<int:pk>/edit", BlogPostUpdateView.as_view(), name="editpost"),
	path("posts/<int:pk>/delete", BlogPostDeleteView.as_view(), name="deletepost"),
]
