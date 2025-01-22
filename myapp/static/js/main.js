const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const pathToRegex = path => new RegExp('^' + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + '$');

const router = async () => {
    const routes = [ 
        { path: "/", view: fetchAndRenderPosts},
        { path: "/create_post", view: () => '<h1>Creating a post!<h1/>'},
        { path: "/posts/:id", view: loadPostDetail},
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

window.addEventListener('popstate', router());

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
                            ${sanitize(post.author)} </p>
                        <a href="/posts/${sanitize(post.id)}"
                            target="_self" 
                            class="btn btn-primary">Read more</a>
                    </div>
                </div>
            </div>`
    return postDiv;
}

async function loadPostDetail(params) {
    const postId = params[1];
    const content = document.getElementById('content');
    content.innerHTML = 'Loading...'; // Show a loading message

    try {
        const response = await fetch(`/api/posts/${postId}/`);
        const post = await response.json();

        // Render the post detail
        content.innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="col-md-8 offset-md-2">
                        <h1>${sanitize(post.title)}</h1>
                        <h3>${sanitize(post.subtitle)}</h3>
                        </br>
                        <p>Created at: ${sanitize(post.creation_date)} by 
                        <strong>${sanitize(post.author)}</strong></p>
                        <p>${sanitize(post.body)}</p>
                    </div>
                </div>
            </div>`
    } catch (error) {
        console.error('Error fetching or rendering post:', error);
    }
}

function sanitize(text) {
    const div = document.createElement('div');
    div.textContent = text; // Prevent XSS by escaping HTML
    return div.innerHTML;
}

