import "@babel/polyfill";

import React from 'react';
import { hydrate, render ,unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// Import i18n messages
import { translationMessages } from 'locale/i18n';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

import App from 'containers/App';

// Import redux configureStore
import configureStore from 'store/configureStore';

// Import PWA service worker
import registerServiceWorker from 'utils/registerServiceWorker';
import 'utils/fontObserver';

// Import styles
import 'sanitize.css';
import 'styles/styled';

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

// ROOT ID
const root = document.getElementById('app');

const renderApp = (messages) => {
    const renderMethod = !!module.hot ? render : hydrate;
    
    renderMethod(
        <Provider store={store}>
            <LanguageProvider messages={messages}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </LanguageProvider>
        </Provider>,
        root
    );
};

if (module.hot) {
    module.hot.accept(['./locale/i18n', './containers/App'], () => {
        renderApp(translationMessages);
    });
}

if (!window.Intl) {
    (new Promise((resolve) => {
        resolve(import('intl'));
    }))
        .then(() => Promise.all([
            import('intl/locale-data/jsonp/ru.js'),
        ]))
        .then(() => renderApp(translationMessages))
        .catch((err) => {
            throw err;
        });
} else {
    unmountComponentAtNode(root);
    renderApp(translationMessages);
}

if (process.env.NODE_ENV === 'development') {
    console.log({ ...process.env });
}

if (process.env.NODE_ENV === 'production') {
    registerServiceWorker();
}