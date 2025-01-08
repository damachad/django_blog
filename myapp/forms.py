from django import forms
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import Comment, CustomUser

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['content']
        widgets = {
            'content': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
        }

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'first_name', 'last_name', 'profile_picture', 'bio']

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'first_name', 'last_name', 'profile_picture']
        