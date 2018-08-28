/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

// Initial routing state
const routeInitialState = fromJS({
    location: { pathname: '/' },
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return state.merge({
                location: action.payload,
            });
        default:
            return state;
    }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
    return combineReducers({
        route: routeReducer,
        language: languageProviderReducer,
        global: globalReducer,
        ...injectedReducers,
    });
}
