import { fromJS } from 'immutable';

const initialState = fromJS({ });

function globalReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default globalReducer;
