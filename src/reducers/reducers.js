import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES } from '../actions/actions';


//reducer for movie filtering
function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

//reducer for listing all movies
function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

//combined reducer
const moviesApp = combineReducers({
    visibilityFilter,
    movies
});

export default moviesApp;