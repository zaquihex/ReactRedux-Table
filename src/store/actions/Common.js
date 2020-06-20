import * as actionTypes from './actionTypes';

//Actions to initialize the table and get all movies
export const updateAppState = (page) => ({ type: actionTypes.UPDATE_APP_STATE, page });