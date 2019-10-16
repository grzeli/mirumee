import * as actionTypes from './actionTypes';
import axios from 'axios';

export const startFetching = () => {
    return{
        type: actionTypes.FETCH_PLANETS_PENDING,
    }
}

export const fetchingFailed = (error) => {
    return {
        type: actionTypes.FETCH_PLANETS_REJECTED,
        error: error
    }
}

export const fetchSucces = (planetData) => {
    return {
        type: actionTypes.FETCH_PLANETS_FULLFILED,
        planetData: planetData
    }
}

export const fetchPlanets = (apiUrl) => {
    return dispatch => {
        dispatch(startFetching());
        axios.get(apiUrl)
            .then(response => {
                dispatch(fetchSucces(response.data));
            })
            .catch(err => {
                dispatch(fetchingFailed(err))
                // console.log(err);
                // dispatch(authFail(err.response.data.error));
            })
    };
};