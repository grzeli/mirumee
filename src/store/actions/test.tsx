import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setMovies = movies => {
    return{
        type: actionTypes.FETCH_MOVIES,
        movies: movies
    }
}

export const fetchMovies= () => {
    return dispatch => {
        let url = 'https://swapi.co/api/films';
        axios.get(url)
            .then(response => {
                dispatch(setMovies(response.data.results));
            })
            .catch(err => {
                console.log(err);
                // dispatch(authFail(err.response.data.error));
            })
    };
};