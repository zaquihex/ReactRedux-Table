import * as actionTypes from './actionTypes';

//Actions to initialize the table and get all movies
export const getDataInit = (endpoint) => ({
    type: actionTypes.GET_DATA_INIT,
    endpoint
});

export const getDataStart = () => ({
    type: actionTypes.GET_DATA_START
});

export const getDataSuccess = (films) => ({
    type: actionTypes.GET_DATA_SUCCESS,
    films: films
});

export const getDataFail = (error) => ({
    type: actionTypes.GET_DATA_FAIL,
    error
});

//actions to get a specific movie (When user click on a movie)
export const getMovieStart = (film) => ({
    type: actionTypes.GET_MOVIE_START,
    film: film
});

export const getMovieSuccess = (film) => ({
    type: actionTypes.GET_MOVIE_SUCCESS,
    film
});

export const getMovieFail = (error) => ({
    type: actionTypes.GET_MOVIE_FAIL,
    error: error
});

export const setDatatableError = (error) => ({
    type: actionTypes.SET_DATATABLE_ERROR,
    error: error
});

