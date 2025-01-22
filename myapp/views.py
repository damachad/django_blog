from rest_framework import viewsets
from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
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

    @action(detail=False, methods=['get'], url_path='by-post/(?P<post_id>[^/.]+)')
    def get_comments_by_post(self, request, post_id=None):
        comments = Comment.objects.filter(post_id=post_id).order_by('-creation_date')
        serializer = self.get_serializer(comments, many=True)
        return Response(serializer.data)

def spa_index(request):
    return render(request, 'index.html')
