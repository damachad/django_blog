from django.urls import path
from .views import *

urlpatterns = [
    path("", BlogPostListView.as_view(), name="home"),
	path("register", UserCreateView.as_view(), name="register"),
	path("posts/<int:pk>", BlogPostDetailView.as_view(), name="postdetail"),
	path("posts/add", BlogPostCreateView.as_view(), name="addpost"),
	path("posts/<int:pk>/edit", BlogPostUpdateView.as_view(), name="editpost"),
	path("posts/<int:pk>/delete", BlogPostDeleteView.as_view(), name="deletepost"),
	path('comment/<int:pk>/delete/', CommentDeleteView.as_view(), name='comment_delete'),
	path('profile/', ProfileDetailView.as_view(), name='profile_detail'),
	path('profile/edit', ProfileUpdateView.as_view(), name='profile_edit'),
]
