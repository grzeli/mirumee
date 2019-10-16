import * as actionTypes from './actionTypes';
import axios from 'axios';

export interface element {
    data?: []
}

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
        Promise.all(apiUrl.map(element => {
            return axios.get(element)
        }))
            .then(response => {
                console.log(response)
                let data = [];
                response.map(element => {
                    return data.push(element.data)
                })
                console.log(data)
                dispatch(fetchSucces(data))
            })
            .catch(err => {
                dispatch(fetchingFailed(err))
            })
    }
};