import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    page: 'home'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_APP_STATE:
            return updateObject(state, { page: action.page });
        default:
            return state;
    }
}

export default reducer;