import { fetchComments } from '../api.js';
import { sanitize, formatDate } from '../utils.js';

export async function loadPostDetail(params) {
    if (!params || params.length < 2) {
        document.getElementById('content').innerHTML = `<h1>Invalid Post ID</h1>`;
        return;
    }

    const postId = params[1];
    const content = document.getElementById('content');
    content.innerHTML = 'Loading...';

    try {
        const response = await fetch(`/api/posts/${postId}/`);
        const comments = await fetchComments(postId);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const post = await response.json();
        const sanitizedComments = comments.length > 0
        ? comments.map(comment => 
            `<p><strong>${sanitize(comment.author.username)}</strong> ${sanitize(formatDate(comment.creation_date))}</p>
            <p>${sanitize(comment.content)}</p>`).join('')
            : '<li>No comments yet. Be the first to comment!</li>';

        content.innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="col-md-8 offset-md-2">
                        <h1>${sanitize(post.title || 'No Title')}</h1>
                        <h3>${sanitize(post.subtitle || 'No Subtitle')}</h3>
                        <br />
                        <p>Created at: ${sanitize(formatDate(post.creation_date) || 'Unknown')} by 
                        <strong>${sanitize(post.author.username || 'Anonymous')}</strong></p>
                        <p>${sanitize(post.body || 'No content available.')}</p>
                        <h2>Comments</h2>
                        <div>
                            ${sanitizedComments}
                        </div>
                    </div>
                </div>
            </div>`;
    } catch (error) {
        console.error('Error fetching or rendering post:', error);
        content.innerHTML = `<h1>404 Not Found</h1>`;
    }
}
