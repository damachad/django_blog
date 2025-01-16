document.getElementById('view-posts').addEventListener('click', () => {
    fetch('/api/posts/')
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById('content');
            content.innerHTML = ''; // Clear previous content
            data.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.innerHTML = `<h2>${post.title}</h2><h4>${post.subtitle}</h4><p>${post.body}</p>`;
                content.appendChild(postDiv);
            });
        });
});

function login(username, password) {
    fetch('/api-token-auth/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('authToken', data.token);
    });
}

function getProtectedResource() {
    fetch('/api/protected-resource/', {
        headers: {
            'Authorization': `Token ${localStorage.getItem('authToken')}`
        }
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

function createPost(title, subtitle, body) {
    fetch('/api/posts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ title, subtitle, body })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Post created:', data);
    });
}

window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page === 'post-detail') {
        fetch(`/api/posts/${event.state.id}`)
            .then(response => response.json())
            .then(post => {
                document.getElementById('content').innerHTML = `<h2>${post.title}</h2><h4>${post.subtitle}</h4><p>${post.body}</p>`;
            });
    }
});

function navigateToPostDetail(postId) {
    history.pushState({ page: 'post-detail', id: postId }, '', `/post/${postId}`);
    fetch(`/api/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            document.getElementById('content').innerHTML = `<h2>${post.title}</h2><h4>${post.subtitle}</h4><p>${post.body}</p>`;
        });
}
