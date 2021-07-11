import {combineReducers, createStore} from "redux";

import commonReducer from "./commonReducer";




//import { reducer as formReducer } from 'redux-form';




let reducers = combineReducers({
    commonState: commonReducer
    //form: formReducer
});

let store = createStore(reducers);
window.store = store;

export default store;