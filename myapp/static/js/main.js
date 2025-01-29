const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const pathToRegex = path => new RegExp('^' + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + '$');

const router = async () => {
    const routes = [ 
        { path: "/", view: fetchAndRenderPosts},
        { path: "/create_post", view: loadCreatePostPage},
        { path: "/posts/:id", view: loadPostDetail},
        { path: "/login", view: loadLogin},
        { path: "/logout", view: logout},
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (match)
        await match.route.view(match.result);
    else {
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = '<h1>404 Not Found</h1>';
    }
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => { 
    document.body.addEventListener('click', e => {
        if(e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
})

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
    content.innerHTML = '';

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
                            ${sanitize(post.author.username)} </p>
                        <a href="/posts/${sanitize(post.id)}"
                            target="_self" 
                            class="btn btn-primary">Read more</a>
                    </div>
                </div>
            </div>`
    return postDiv;
}

const fetchComments = async (postId) => {
    try {
        const response = await fetch(`/api/comments/by-post/${postId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const comments = await response.json();
        return comments;
    } catch (error) {
        console.error('Failed to fetch comments:', error);
        return [];
    }
};

async function loadPostDetail(params) {
    if (!params || params.length < 2) {
        console.error('Invalid params:', params);
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
        ? comments.map(comment => `<li>${sanitize(comment.content)}</li>`).join('')
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
                        <ul>
                            ${sanitizedComments}
                        </ul>
                    </div>
                </div>
            </div>`;
    } catch (error) {
        console.error('Error fetching or rendering post:', error);
        content.innerHTML = `<h1>404 Not Found</h1>`;
    }
}

function sanitize(text) {
    const div = document.createElement('div');
    div.textContent = text; // Prevent XSS by escaping HTML
    return div.innerHTML;
}

function getCSRFToken() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];

    return cookieValue || null;
}

async function loadCreatePostPage() {
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

async function loadLogin() {
    const content = document.getElementById('content');
    content.innerHTML = `<div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h2>Log In</h2>
                <form id="login-form">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" id="_username" class="form-control" placeholder="Enter username" required />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="_password" class="form-control" placeholder="Enter password" required />
                    </div>
                    <button type="submit" class="btn btn-primary">Log In</button>
                </form>
            </div>
        </div>
    </div>`

    document.getElementById('login-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const usernameInput = document.getElementById('_username');
        const passwordInput = document.getElementById('_password');

        if (!usernameInput || !passwordInput) {
            console.error("Username or password input field not found!");
            return;
        }

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
    
        try {
            const response = await fetch('/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Login failed:', errorData);
                alert('Login failed. Please check your credentials and try again.');
                return;
            }
    
            const data = await response.json();
            localStorage.setItem('authToken', data.access); // Store the access token
            localStorage.setItem('refreshToken', data.refresh); // Store the refresh token
            alert('Login successful!');
            addUsernameToNav(username);
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    });
}

const addUsernameToNav = (username) => {
    const usernameLink = document.getElementById('username')
    usernameLink.innerHTML = `<a class="nav-link" href="" data-link>${username}</a>`
}

async function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    alert('You have been logged out.');
    const usernameLink = document.getElementById('username')
    usernameLink.innerHTML = ``
};

// Example usage
document.getElementById('log-out').addEventListener('click', logout);
