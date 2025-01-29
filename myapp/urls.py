from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, BlogPostViewSet, CommentViewSet, spa_index

router = DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'posts', BlogPostViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
	path('', spa_index, name='home'),
	re_path(r'^.*$', spa_index, name='spa_index'),
]
