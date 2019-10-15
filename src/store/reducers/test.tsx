import {updateObject} from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';;

const initialState = {
    movies: [],
    error: null,
    loading: false
}

const fetchMovies = (state, action) => {
    const newObject = updateObject(state, {
        movies: action.movies
    })
    return newObject
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MOVIES: return fetchMovies(state, action);
        default:
            return state;
    }
}

export default reducer;