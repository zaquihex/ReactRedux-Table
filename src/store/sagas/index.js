import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import { getDataSaga, getMovieSaga } from './datatable';
//function listening to fill the table with data when the application start
export function* watchDatatable() {
	yield takeEvery(actionTypes.GET_DATA_INIT, getDataSaga);
}

//function listening to get the detail of one movie
export function* watchMovie() {
	yield takeEvery(actionTypes.GET_MOVIE_START, getMovieSaga);
}
