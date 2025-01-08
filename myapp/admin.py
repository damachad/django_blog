from django.contrib.auth.admin import UserAdmin
from django.contrib import admin
from .models import BlogPost, CustomUser

admin.site.register(BlogPost)

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    fieldsets = UserAdmin.fieldsets + (
        ('Profile Info', {'fields': ('profile_picture', 'bio')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Profile Info', {'fields': ('profile_picture',)}),
    )
    