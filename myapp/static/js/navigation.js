import { router } from './router.js';

export const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

export const pathToRegex = path => new RegExp('^' + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + '$');
