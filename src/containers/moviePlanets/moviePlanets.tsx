import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';

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
}

export interface IMoviePlanetsProps extends StateProps, DispatchProps {}

export class MoviePlanets extends React.Component<IMoviePlanetsProps, IMoviePlanetsState> {
    constructor(props) {
        super(props);
        this.state = {
            showDropDown: false,
            planetData: []
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

    render() {
        // console.log(this.props)
        // console.log(this.props.planetData)
        // console.log(this.state.planetData)
        // console.log(this.props.loading)
        return (
            <React.Fragment>
                <ListGroupItem onClick={this.dropDownHandler} className={this.state.showDropDown ? 'open' : null}>{this.props.title}</ListGroupItem>
                <Table className="movie-planets_table" style={this.state.showDropDown ? { display: 'table' } : { display: 'none' }}>
                    <thead>
                        <tr>
                            <th>Planet Name</th>
                            <th>Rotation period</th>
                            <th>Orbital period</th>
                            <th>Diameter</th>
                            <th>Climate</th>
                            <th>Surface water</th>
                            <th>Population</th>
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
