import { navigateTo } from '../navigation.js';
import { getCSRFToken } from '../utils.js';
import { loadLogin } from './login.js';

export async function loadCreatePostPage() {
    if (!localStorage.getItem('authToken')) {
        alert('You have to log in to be able to create a post.');
        navigateTo("/login");
        return;
    }
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <h2>Create a New Post</h2>
                    <form id="create-post-form">
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" id="title" class="form-control" placeholder="Enter the title" required />
                        </div>
                        <div class="form-group">
                            <label for="subtitle">Subtitle</label>
                            <input type="text" id="subtitle" class="form-control" placeholder="Enter the subtitle" required />
                        </div>
                        <div class="form-group">
                            <label for="body">Body</label>
                            <textarea id="body" class="form-control" placeholder="Enter the content" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Create Post</button>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Re-attach the event listener to the newly added form
    document.getElementById('create-post-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value.trim();
        const subtitle = document.getElementById('subtitle').value.trim();
        const body = document.getElementById('body').value.trim();
        const csrfToken = getCSRFToken();

        try {
            const response = await fetch('/api/posts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify({ title, subtitle, body }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to create post:', errorData);
                alert('Failed to create post. Please try again.');
                return;
            }

            const newPost = await response.json();
            alert(`Post created successfully with ID: ${newPost.id}`);
            document.getElementById('create-post-form').reset();
        } catch (error) {
            console.error('Error creating post:', error);
            alert('An error occurred. Please try again.');
        }
    });
};