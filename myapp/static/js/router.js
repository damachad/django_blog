import { fetchAndRenderPosts } from './views/home.js';
import { loadCreatePostPage } from './views/createPost.js';
import { loadPostDetail } from './views/postDetail.js';
import { loadLogin } from './views/login.js';
import { logout } from './views/logout.js';
import { loadProfile } from './views/profile.js';
import { navigateTo, pathToRegex } from './navigation.js';

export async function router() {
    const routes = [
        { path: "/", view: fetchAndRenderPosts },
        { path: "/create_post", view: loadCreatePostPage },
        { path: "/posts/:id", view: loadPostDetail },
        { path: "/users/:id", view: loadProfile },
        { path: "/login", view: loadLogin },
        { path: "/logout", view: logout },
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (match) {
        await match.route.view(match.result);
    } else {
        const contentDiv = document.getElementById('content')
        contentDiv.innerHTML = '<h1>404 Not Found</h1>';
    }
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    document.getElementById('log-out').addEventListener('click', logout);
    router();
});
