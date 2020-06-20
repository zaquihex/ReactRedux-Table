import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	loading: false,
	error: null,
	films: [],
	film: null,
	tabIndex: '0'
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_DATA_INIT:
			return updateObject(state, { loading: false, error: null });
		case actionTypes.GET_DATA_START:
			return updateObject(state, { loading: true });
		case actionTypes.GET_DATA_SUCCESS:
			return updateObject(state, { loading: false, films: action.films });
		case actionTypes.GET_DATA_FAIL:
			return updateObject(state, { loading: false, error: action.error });
		case actionTypes.GET_MOVIE_START:
			return updateObject(state, { loading: true, film: null });
		case actionTypes.GET_MOVIE_SUCCESS:
			return updateObject(state, { loading: false, film: action.film });
		case actionTypes.GET_MOVIE_FAIL:
			return updateObject(state, { loading: false, error: action.error });
		case actionTypes.SET_DATATABLE_ERROR:
			return updateObject(state, { error: action.error });
		default:
			return state;
	}
};

export default reducer;
