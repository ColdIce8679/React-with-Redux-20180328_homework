import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import apidata from './apidata';
import message from './message';

const root_reducer = combineReducers({
    data   : message,
    apidata: apidata,
    routing: routerReducer
})

export default root_reducer;