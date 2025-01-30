import { sanitize } from '../utils.js';

export async function loadProfile(params) {
	if (!params || params.length < 2) {
        document.getElementById('content').innerHTML = `<h1>Invalid User ID</h1>`;
        return;
    }
	const userId = params[1];
    const content = document.getElementById('content');
    content.innerHTML = 'Loading...';
	try {
		const response = await fetch(`/api/users/${userId}`);
		if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
		const user = await response.json();
		content.innerHTML = `<div class="container">
			<h2>${sanitize(user.username)}'s Profile</h2>
			<img src="${sanitize(user.profile_picture)}" alt="Profile Picture" width="150" height="150" class="rounded-circle">

			<ul>
				<li><strong>Username:</strong> ${sanitize(user.username)}</li>
				<li><strong>Email:</strong> ${sanitize(user.email)}</li>
				<li><strong>First Name:</strong> ${sanitize(user.first_name)}</li>
				<li><strong>Last Name:</strong> ${sanitize(user.last_name)}</li>
				<li><strong>Bio:</strong> ${sanitize(user.bio)}</li>
			</ul>
		</div>`;
	} catch (error) {
        console.error('Error fetching or rendering user profile:', error);
        content.innerHTML = `<h1>404 Not Found</h1>`;
    }
}
