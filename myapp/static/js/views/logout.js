export async function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    alert('You have been logged out.');
    const usernameLink = document.getElementById('username')
    usernameLink.innerHTML = ``
    const logout = document.getElementById('log-out')
    logout.innerHTML = ``
    const login = document.getElementById('log-in')
    login.innerHTML = `Log In`
};