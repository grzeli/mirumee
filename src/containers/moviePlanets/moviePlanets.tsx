import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';
import sortBy from 'lodash/sortBy';

import { ListGroupItem, Table } from 'reactstrap';
import { IElementData } from '../../store/actions/moviePlanets';

import './moviePlanets.scss';

export interface IMoviePlanetsProps {
    planets?: [string];
    title?: string;
    fetchPlanetData(url?: [{}]): VoidFunction;
}

export interface IMoviePlanetsState {
    showDropDown?: boolean;
    planetData?: IElementData[];
    reverse?: boolean;
    intPlanetData?: any;
}

export interface IMoviePlanetsProps extends StateProps, DispatchProps {}

export class MoviePlanets extends React.Component<IMoviePlanetsProps, IMoviePlanetsState> {
    constructor(props) {
        super(props);
        this.state = {
            showDropDown: false,
            planetData: [],
            intPlanetData: [],
            reverse: false
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.planetData !== prevProps.planetData && this.state.planetData.length === 0 && this.state.showDropDown === true) {
            this.planetDataHandler();
        }
    }

    planetDataHandler = () => {
        const planetData = this.props.planetData;
        this.setState({ planetData })
    }

    dropDownHandler = async () => {
        this.setState(prevState => ({ showDropDown: !prevState.showDropDown }))
        await this.props.fetchPlanetData(this.props.planets);
    }

    sortDataHandler = key => {
        const planetData = this.state.planetData;
        planetData.map(element => {
            element.rotation_period = element.rotation_period !== 'unknown' && element.rotation_period !== '' ? parseInt(element.rotation_period, 10) : '';
            element.orbital_period = element.orbital_period !== 'unknown' && element.orbital_period !== '' ? parseInt(element.orbital_period, 10) : '';
            element.diameter = element.diameter !== 'unknown' && element.diameter !== '' ? parseInt(element.diameter, 10) : '';
            element.surface_water = element.surface_water !== 'unknown' && element.surface_water !== '' ? parseInt(element.surface_water, 10) : '';
            element.population = element.population !== 'unknown' && element.population !== '' ? parseInt(element.population, 10) : '';
            return element;
        })
        const dataSorted = sortBy(planetData, key);
        if (this.state.reverse) {dataSorted.reverse()};
        this.setState({ planetData: dataSorted });
        this.setState(prevState => ({ reverse: !prevState.reverse }));
    }

    render() {
        // console.log(this.props)
        // console.log(this.props.planets)
        // console.log(this.props.planetData[0)
        // console.log(this.state.planetData)
        // console.log(this.props.loading)
        return (
            <React.Fragment>
                <ListGroupItem className={this.state.showDropDown ? 'open' : null}>
                    <h5 onClick={this.dropDownHandler}>{this.props.title}</h5>
                    <Table className="movie-planets_table" style={this.state.showDropDown ? { display: 'table' } : { display: 'none' }}>
                        <thead>
                            <tr className="movie-planets_table_sortable">
                                <th onClick={e => this.sortDataHandler('name')}>Planet Name</th>
                                <th onClick={e => this.sortDataHandler('rotation_period')}>Rotation period</th>
                                <th onClick={e => this.sortDataHandler('orbital_period')}>Orbital period</th>
                                <th onClick={e => this.sortDataHandler('diameter')}>Diameter</th>
                                <th onClick={e => this.sortDataHandler('climate')}>Climate</th>
                                <th onClick={e => this.sortDataHandler('surface_water')}>Surface water</th>
                                <th onClick={e => this.sortDataHandler('population')}>Population</th>
                            </tr>
                        </thead>
                            {this.state.planetData !== undefined && this.state.planetData.length > 0 ? (
                                <tbody>
                                    {this.state.planetData.map((element, index) => (
                                        <tr key={index}>
                                            <td>{element.name}</td>
                                            <td>{element.rotation_period}</td>
                                            <td>{element.orbital_period}</td>
                                            <td>{element.diameter}</td>
                                            <td>{element.climate}</td>
                                            <td>{element.surface_water}</td>
                                            <td>{element.population}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : <tbody className="spinner movie-planets_spinner" /> }
                    </Table>
                </ListGroupItem>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        planetData: state.planets.planetData,
        loading: state.planets.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPlanetData: (url) => dispatch(actionTypes.fetchPlanets(url))
    }
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MoviePlanets);
