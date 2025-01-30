from django.core.management.base import BaseCommand
from django.utils import lorem_ipsum
from myapp.models import CustomUser, BlogPost, Comment

class Command(BaseCommand):
    help = 'Creates application data'

    def handle(self, *args, **kwargs):
        # get or create superuser
        user = CustomUser.objects.filter(username='admin').first()
        if not user:
            user = CustomUser.objects.create_superuser(username='admin', password='test')
        user2 = CustomUser.objects.create(username=lorem_ipsum.words(1, common=False), password='test')
        user3 = CustomUser.objects.create(username=lorem_ipsum.words(1, common=False), password='test')

        # create posts
        posts = [
            BlogPost(author=user, title=lorem_ipsum.words(3, common=False), subtitle=lorem_ipsum.words(4), body=lorem_ipsum.paragraph()),
            BlogPost(author=user2, title=lorem_ipsum.words(4, common=False), subtitle=lorem_ipsum.words(5), body=lorem_ipsum.paragraph()),
            BlogPost(author=user3, title=lorem_ipsum.words(3, common=False), subtitle=lorem_ipsum.words(4), body=lorem_ipsum.paragraph()),
        ]

        # create posts & re-fetch from DB
        BlogPost.objects.bulk_create(posts)
        posts = BlogPost.objects.all()

        user_commenter = CustomUser.objects.create(username=lorem_ipsum.words(1, common=False), password='test')
        for post in posts:
            Comment.objects.create(post=post, author=user_commenter, content=lorem_ipsum.sentence())
