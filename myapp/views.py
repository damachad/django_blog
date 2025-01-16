from rest_framework import viewsets
from django.shortcuts import render
from .models import CustomUser, BlogPost, Comment
from .serializers import CustomUserSerializer, BlogPostSerializer, CommentSerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

def spa_index(request):
    return render(request, 'index.html')
