import { getCSRFToken } from '../utils.js';

export async function loadLogin() {
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
                    'X-CSRFToken': getCSRFToken(),
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