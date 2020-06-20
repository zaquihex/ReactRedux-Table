import { put } from "redux-saga/effects";

import { key } from "../../constants";

import axios from "../../axios";
import * as actions from "../actions";

//function to call the API "themoviedb" and fill the datatable
export function* getDataSaga(action) {
  const endpoint = action.endpoint;
  let defaultEndpoint = "/3/discover/movie?api_key=" + key;
  if (endpoint !== undefined && endpoint !== "theMovieDB") {
    defaultEndpoint = endpoint;
  }
  try {
    yield put(actions.getDataStart());
    const response = yield axios.get(defaultEndpoint);
    let fullData = response.data;
    if(response.data.results) {
      fullData = response.data.results
    }
    if(response.data.list) {
      fullData = response.data.list
    }
    yield put(actions.getDataSuccess(fullData));
  } catch (error) {
    const fullError = {
      title: "ERROR",
      data: [
        {
          label: "error",
          value: "sorry, there has been an error retrieving data from the url"
        },
        {
          label: "note",
          value:
            "be sure url is right and the data is on the list/results of the response"
        }
      ]
    };
    yield put(actions.getDataFail(fullError));
  }
}

//function to call the API "themoviedb" and get the info
export function* getMovieSaga(opts) {
  const { film } = opts;
  try {
    const response = yield axios.get(
      "/3/movie/".concat(film.toString().concat("?api_key=" + key))
    );
    yield put(actions.getMovieSuccess(response.data));
  } catch (error) {
    yield put(actions.getMovieFail(error));
  }
}
