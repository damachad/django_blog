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

document.addEventListener("DOMContentLoaded", () => {
	document.body.addEventListener("click", e => {
		if (e.target.matches("[data-link]")) {
			e.preventDefault();
			history.pushState(null, null, e.target.href);
		}
	});
});
