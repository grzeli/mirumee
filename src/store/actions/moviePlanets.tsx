import * as actionTypes from './actionTypes';
import axios from 'axios';

export interface IElement {
    data?: IElementData[]
}

export interface IElementData {
    [x: string]: any;
    climate?: string;
    created?: string;
    diameter?: any;
    films?: string[];
    gravit?: string;
    name?: string;
    orbital_period?: any;
    population?: any;
    residents?: string[];
    rotation_period?: any;
    surface_water?: any;
    terrain?: string;
    url?: string;
}

export const startFetching = () => {
    return{
        type: actionTypes.FETCH_PLANETS_PENDING
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
            .then((response: ReadonlyArray<IElement>) => {
                let data = [];
                response.map(element => {
                    return data.push(element.data)
                })
                dispatch(fetchSucces(data))
            })
            .catch(err => {
                dispatch(fetchingFailed(err))
            })
    }
};