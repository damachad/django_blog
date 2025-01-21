document.getElementById('view-posts').addEventListener('click', fetchAndRenderPosts);

async function fetchAndRenderPosts() {
    try {
        const posts = await fetchPosts('/api/posts/');
        renderPosts(posts);
    } catch (error) {
        console.error('Error fetching or rendering posts:', error);
    }
}

async function fetchPosts(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

function renderPosts(posts) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear previous content

    // Create the container and row divs
    const container = document.createElement('div');
    container.className = 'container';

    const row = document.createElement('div');
    row.className = 'row';

    // Append each post to the row
    posts.forEach(post => {
        row.appendChild(createPostElement(post));
    });

    // Append the row to the container, then the container to the content
    container.appendChild(row);
    content.appendChild(container);
}

// Helper function to format a date string
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'card mb-3'; // Use Bootstrap classes for styling
    postDiv.innerHTML = `
        <div class="col-md-4 col-sm-6 mb-4">
                <div class="card h-100 shadow">
                    <div class="card-body">
                        <h3 class="card-title">${sanitize(post.title)}</h3>
                        <h5 class="card-text">${sanitize(post.subtitle)}</h5>
                        <p class="card-text">${sanitize(formatDate(post.creation_date))} by 
                            ${sanitize(post.author)} </p>
                        <a href=""
                            target="_self" 
                            class="btn btn-primary">Read more</a>
                    </div>
                </div>
            </div>`
    return postDiv;
}

function sanitize(text) {
    const div = document.createElement('div');
    div.textContent = text; // Prevent XSS by escaping HTML
    return div.innerHTML;
}


document.addEventListener("DOMContentLoaded", () => {
	document.body.addEventListener("click", e => {
		if (e.target.matches("[data-link]")) {
			e.preventDefault();
			history.pushState(null, null, e.target.href);
		}
	});
});
