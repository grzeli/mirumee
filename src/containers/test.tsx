import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/index';

import { Container, ListGroup, ListGroupItem, Spinner } from 'reactstrap';
import './test.scss';
import logo from '../assets/images/logo.svg';

export class Test extends React.Component<{onFetchMovies: VoidFunction, movies: [{title: string}]}> {
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
                                <ListGroupItem key={index}>{element.title}</ListGroupItem>
                            ))
                        ) : <Spinner color="info" style={{ margin: 'auto', marginBottom: '40px', height: '5rem', width: '5rem' }} />}
                    </ListGroup>
                </div>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        movies: state.test.movies
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
