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

        # create posts
        posts = [
            BlogPost(author=user, title="Beautiful Books", subtitle=lorem_ipsum.sentence(), body=lorem_ipsum.paragraph()),
            BlogPost(author=user, title="A Random Post", subtitle=lorem_ipsum.sentence(), body=lorem_ipsum.paragraph()),
            BlogPost(author=user, title="Top Secret", subtitle=lorem_ipsum.sentence(), body=lorem_ipsum.paragraph()),
        ]

        # create posts & re-fetch from DB
        BlogPost.objects.bulk_create(posts)
        posts = BlogPost.objects.all()

        user2 = CustomUser.objects.create(username='john', password='testing2')
        for post in posts:
            Comment.objects.create(post=post, author=user2, content=lorem_ipsum.sentence())
