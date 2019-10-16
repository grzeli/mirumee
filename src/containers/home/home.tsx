import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';

import { Container, ListGroup, Spinner } from 'reactstrap';
import './home.scss';
import logo from '../../assets/images/logo.svg';
import MoviePlanets from '../moviePlanets/moviePlanets';

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
        console.log(this.props.movies)
        // console.log(this.props.onFetchMovies())
        return (
            <Container>
                <div className="col-lg-10 offset-lg-1 movie-container">
                    <img src={logo} alt="logo" />
                    <ListGroup>
                        {typeof(this.props.movies) !== 'undefined' && this.props.movies.length > 0 ? (
                            this.props.movies.map((element, index) => (
                                <MoviePlanets
                                    key={index}
                                    planets={element.planets}
                                    title={element.title}
                                />
                            ))
                        ) : <Spinner color="info" style={{ margin: 'auto', marginTop: '17.5%', height: '5rem', width: '5rem' }} />}
                    </ListGroup>
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
