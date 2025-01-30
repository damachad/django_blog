export async function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    alert('You have been logged out.');
    const usernameLink = document.getElementById('username')
    usernameLink.innerHTML = ``
};