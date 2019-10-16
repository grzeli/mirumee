import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';

import { ListGroupItem, Spinner, Table } from 'reactstrap';

export interface IMoviePlanetsProps {
    planets?: [string];
    title?: string;
    fetchPlanetData(url?: string): VoidFunction;
    planetData?: [{string}]
}

export interface IMoviePlanetsState {
    showDropDown?: boolean;
    planetsData?: Array<object>;
}

export class MoviePlanets extends React.Component<IMoviePlanetsProps, IMoviePlanetsState> {
    constructor(props) {
        super(props);
        this.state = {
            showDropDown: false,
            planetsData: []
        };
    }

    // componentDidMount() {
    //     this.props.fetchPlanetData(this.props.planets[0])
    // }


    dropDownHandler = () => {
        this.setState(prevState => ({ showDropDown: !prevState.showDropDown }))
        // this.planetsData();
    }

    // planetsData = async () => {
    //     await Promise.map(this.props.planets, async element => {
    //         console.log('a')
    //         const planetData = await this.props.fetchPlanetData(element);
    //         console.log('b')
    //         const planetsData = this.state.planetsData;
    //         planetsData.push(planetData);
    //         this.setState({ planetsData })
    //     })

    //     console.log(this.state.planetsData)
    // }

    render() {
        // console.log(this.props)
        // console.log(this.props.planetData)
        console.log(this.state.planetsData)
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
                    <tbody>
                        <tr>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                        <tr>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                        <tr>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                    </tbody>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MoviePlanets);
