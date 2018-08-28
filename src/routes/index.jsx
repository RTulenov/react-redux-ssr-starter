import HomePage from 'pages/HomePage';
import NotFoundPage from 'pages/NotFoundPage';

export const routes = [
    { path: `/`, exact: true, component: HomePage },
    { path: `*`, component: NotFoundPage },
]