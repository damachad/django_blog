from rest_framework import serializers
from .models import CustomUser, BlogPost, Comment

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'first_name', 'last_name', 'email', 'bio', 'profile_picture']
        
class CommentSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = ['post', 'author', 'creation_date', 'modification_date', 'content']

class BlogPostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    author = CustomUserSerializer(read_only=True)
    class Meta:
        model = BlogPost
        fields = '__all__'
        read_only_fields = ['author', 'creation_date', 'modification_date', 'comments']

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['author'] = request.user
        return super().create(validated_data)
