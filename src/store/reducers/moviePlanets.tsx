import {updateObject} from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';;

const initialState = {
    planetData: [],
    error: null,
    loading: false
}

const fetchPlanets = (state, action) => {
    const newObject = updateObject(state, {
        planetData: action.planetData,
        loading: false
    })
    return newObject
}

const fetchPlanetsRejected = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const planetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PLANETS_PENDING: return updateObject(state, { loading: true, planetData: [] });
        case actionTypes.FETCH_PLANETS_FULLFILED: return fetchPlanets(state, action);
        case actionTypes.FETCH_PLANETS_REJECTED: return fetchPlanetsRejected(state, action);
        default:
            return state;
    }
}

export default planetsReducer;