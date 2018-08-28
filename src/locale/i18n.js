/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */

import { addLocaleData } from 'react-intl';
import ruLocaleData from 'react-intl/locale-data/ru';
import enLocaleData from 'react-intl/locale-data/en';

import { DEFAULT_LOCALE } from 'containers/App/constants';

import ruTranslationMessages from 'translations/ru.json';
import enTranslationMessages from 'translations/en.json';

addLocaleData([...ruLocaleData, ...enLocaleData]);

export const appLocales = [ 'ru', 'en' ];

export const formatTranslationMessages = (locale, messages) => {
    const defaultFormattedMessages = locale !== DEFAULT_LOCALE
        ? formatTranslationMessages(DEFAULT_LOCALE, ruTranslationMessages)
        : {};

    return Object.keys(messages).reduce((formattedMessages, key) => {
        const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
            ? defaultFormattedMessages[key]
            : messages[key];
        return Object.assign(formattedMessages, { [key]: formattedMessage });

    }, {});
};

export const translationMessages = {
    ru: formatTranslationMessages('ru', ruTranslationMessages),
    en: formatTranslationMessages('en', enTranslationMessages),
};
