import React from "react";
//import DOM
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
//import redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import history from "./history";

import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import registerServiceWorker from "./registerServiceWorker";

import datatableReducer from "./store/reducers/datatable";
import commonReducer from "./store/reducers/common";
import { watchDatatable } from "./store/sagas";
import { watchMovie } from "./store/sagas";

import App from "./App";
//import styles
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

//Change "!==" to "===" to debug redux (redux extension is necessary)
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ movies: datatableReducer,app: commonReducer });

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchDatatable);
sagaMiddleware.run(watchMovie);

const app = (
  <Provider store={store}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
