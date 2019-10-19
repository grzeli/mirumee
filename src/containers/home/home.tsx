import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';

import { Container, ListGroup } from 'reactstrap';
import './home.scss';
import MoviePlanets from '../moviePlanets/moviePlanets';
import NewMovie from '../newMovie/newMovie';

const logoPath = require ('../../assets/images/logo.svg') as string;

export interface IHomeMoviesProps {
    title?: string;
    planets?: [string]
}

export interface IHomeProps {
    onFetchMovies: VoidFunction;
    movies: [IHomeMoviesProps];
}

export class Test extends React.Component<IHomeProps> {
    componentDidMount() {
        this.props.onFetchMovies();
    }
    render() {
        return (
            <Container>
                <div className="col-lg-10 offset-lg-1 movie-container">
                    <img src={logoPath} alt="logo" />
                    <ListGroup>
                        {typeof(this.props.movies) !== 'undefined' && this.props.movies.length > 0 ? (
                            this.props.movies.map((element, index) => (
                                <MoviePlanets
                                    key={index}
                                    planets={element.planets}
                                    title={element.title}
                                />
                            ))
                        ) : <div className="spinner movie-container_spinner" /> }
                    </ListGroup>
                    <NewMovie />
                </div>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        movies: state.home.movies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchMovies: () => dispatch(actionTypes.fetchMovies())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Test);
