from django.urls import path
from .views import BlogPostListView, BlogPostDetailView, BlogPostCreateView, BlogPostDeleteView, BlogPostUpdateView

urlpatterns = [
    path("", BlogPostListView.as_view(), name="postlist"),
	path("posts/<int:pk>", BlogPostDetailView.as_view(), name="postdetail"),
	path("posts/add", BlogPostCreateView.as_view(), name="addpost"),
	path("posts/<int:pk>/edit", BlogPostUpdateView.as_view(), name="editpost"),
	path("posts/<int:pk>/delete", BlogPostDeleteView.as_view(), name="deletepost"),
]
