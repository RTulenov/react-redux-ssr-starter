import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');
const selectRoute = (state) => state.get('route');
const selectLanguage = (state) => state.get('language');

const makeSelectLocation = () => createSelector(
    selectRoute,
    (routeState) => routeState.get('location').toJS()
);

const makeSelectLanguage = () => createSelector(
    selectLanguage,
    (languageState) => languageState.get('locale')
);

export {
    selectGlobal,
    selectRoute,
    selectLanguage,
    makeSelectLocation,
    makeSelectLanguage
};
