from django.test import TestCase
from myapp.models import BlogPost, CustomUser, Comment
from django.urls import reverse

class BlogPostModelTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='1u2s3e4r5')
        self.post = BlogPost.objects.create(
            title="Test Post",
            subtitle="Test Subtitle",
            body="Test body content",
            author=self.user
        )

    def test_blog_post_creation(self):
        self.assertEqual(self.post.title, "Test Post")
        self.assertEqual(self.post.author.username, "testuser")

class BlogPostViewTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser2', password='1u2s3e4r5')
        self.client.login(username='testuser2', password='1u2s3e4r5')
        self.post = BlogPost.objects.create(
            title="Test Post",
            subtitle="Test Subtitle",
            body="Test body content",
            author=self.user
        )

    def test_blog_post_list_view(self):
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Test Post")

    def test_blog_post_detail_view(self):
        response = self.client.get(reverse('postdetail', args=[self.post.id]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.post.body)

    def test_blog_post_create_view(self):
        response = self.client.post(reverse('addpost'), {
            'title': 'New Post',
            'subtitle': 'Subtitle',
            'body': 'Body content',
        })
        self.assertEqual(response.status_code, 302)  # Redirect after creation
        self.assertTrue(BlogPost.objects.filter(title="New Post").exists())

    def test_blog_post_update_view(self):
        response = self.client.post(reverse('editpost', args=[self.post.id]), {
            'title': 'Updated Title',
        })
        self.assertEqual(response.status_code, 200)
        self.post.refresh_from_db()
        self.assertEqual(self.post.title, "Updated Title")

    def test_blog_post_delete_view(self):
        response = self.client.post(reverse('deletepost', args=[self.post.id]))
        self.assertEqual(response.status_code, 302)
        self.assertFalse(BlogPost.objects.filter(id=self.post.id).exists())
        
class UserRegistrationTest(TestCase):
    def test_user_registration(self):
        response = self.client.post(reverse('register'), {
            'username': 'newuser',
            'password1': 'complexpassword123',
            'password2': 'complexpassword123'
        })
        self.assertEqual(response.status_code, 302)
        self.assertTrue(CustomUser.objects.filter(username='newuser').exists())

class UserAuthenticationTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser3', password='1u2s3e4r5')

    def test_user_login(self):
        response = self.client.post(reverse('login'), {
            'username': 'testuser3',
            'password': '1u2s3e4r5'
        })
        self.assertEqual(response.status_code, 302)

class ProfileViewTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='1u2s3e4r5')

    def test_profile_detail(self):
        self.client.login(username='testuser', password='1u2s3e4r5')
        response = self.client.get(reverse('profile_detail'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'testuser')

class ProfileEditTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='1u2s3e4r5')

    def test_profile_edit(self):
        self.client.login(username='testuser', password='1u2s3e4r5')
        response = self.client.post(reverse('profile_edit'), {
            'username': 'updateduser',
        })
        self.assertEqual(response.status_code, 302)
        self.user.refresh_from_db()
        self.assertEqual(self.user.username, 'updateduser')
    
class PasswordChangeTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='1u2s3e4r5')

    def test_password_changes(self):
        self.client.login(username='testuser', password='1u2s3e4r5')
        response = self.client.post(reverse('password_changes'), {
            'old_password': '1u2s3e4r5',
            'new_password1': 'newpassword123',
            'new_password2': 'newpassword123'
        })
        self.assertEqual(response.status_code, 302)
        self.client.logout()
        login = self.client.login(username='testuser', password='newpassword123')
        self.assertTrue(login)

class CommentTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='1u2s3e4r5')
        self.post = BlogPost.objects.create(
            title="Test Post",
            subtitle="Test Subtitle",
            body="Test body content",
            author=self.user
        )

    def test_comment_creation(self):
        self.client.login(username='testuser', password='1u2s3e4r5')

        comment_data = {
            'content': "This is a test comment.",
            'post': self.post.id,
        }

        response = self.client.post(reverse('postdetail', args=[self.post.pk]), comment_data)

        self.assertEqual(response.status_code, 302)
        self.assertEqual(Comment.objects.count(), 1)

        comment = Comment.objects.first()
        self.assertEqual(comment.content, "This is a test comment.")
        self.assertEqual(comment.post, self.post)
        self.assertEqual(comment.author, self.user)

    def test_comment_delete(self):
        comment = self.post.comments.create(
            content="Test Comment",
            author=self.user
        )
        self.client.login(username='testuser', password='1u2s3e4r5')
        response = self.client.post(reverse('comment_delete', args=[comment.id]))
        self.assertEqual(response.status_code, 302)
        self.assertFalse(self.post.comments.filter(id=comment.id).exists())

    def test_comment_display(self):
        Comment.objects.create(
            content="Displayed comment",
            post=self.post,
            author=self.user
        )
        
        response = self.client.get(reverse('postdetail', args=[self.post.pk]))
        self.assertContains(response, "Displayed comment")

