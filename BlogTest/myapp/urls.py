from django.urls import path
from .views import BlogPostListView, BlogPostDetailView

urlpatterns = [
    path("posts/", BlogPostListView.as_view()),
	path("posts/<int:pk>", BlogPostDetailView.as_view()),
]
