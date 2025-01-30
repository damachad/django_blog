import { fetchPosts } from '../api.js';
import { sanitize, formatDate } from '../utils.js';

export async function fetchAndRenderPosts() {
    try {
        const posts = await fetchPosts('/api/posts/');
        renderPosts(posts);
    } catch (error) {
        console.error('Error fetching or rendering posts:', error);
    }
}

function renderPosts(posts) {
    const content = document.getElementById('content');
    content.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'container';

    const row = document.createElement('div');
    row.className = 'row';

    posts.forEach(post => {
        row.appendChild(createPostElement(post));
    });

    container.appendChild(row);
    content.appendChild(container);
}

function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'card mb-3';
    postDiv.innerHTML = `
        <div class="col-md-4 col-sm-6 mb-4">
            <div class="card h-100 shadow">
                <div class="card-body">
                    <h3 class="card-title">${sanitize(post.title)}</h3>
                    <h5 class="card-text">${sanitize(post.subtitle)}</h5>
                    <p class="card-text">${sanitize(formatDate(post.creation_date))} by 
                        ${sanitize(post.author.username)}</p>
                    <a href="/posts/${sanitize(post.id)}" class="btn btn-primary" data-link>Read more</a>
                </div>
            </div>
        </div>`;
    return postDiv;
}
