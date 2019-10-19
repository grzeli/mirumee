import React from 'react';
import axios from 'axios';

import { Form, FormGroup, Input, Label, Button, ListGroup } from 'reactstrap'
import asyncComponent from '../../hoc/asyncComponent';

import './newMovie.scss';

const { object, string } = require('yup');
const AsyncMoviePlanets = asyncComponent(()=> {
    return import('../moviePlanets/moviePlanets');
})

interface FilteredPlanet {
    name?: string;
    url?: string;
}

interface IMovie {
    name?: string;
    planets?: string[];
}

export interface INewMovieState {
    showMovie?: boolean;
    filteredPlanets?: FilteredPlanet[];
    addedPlanetNames?: string[];
    showResults?: boolean;
    movieName?: string;
    movies?: IMovie[];
    planetName?: string;
    planets?: string[];
    movieValid?: boolean;
    formError?: string;
}

const validationSchema = object({
    name: string()
        .required('Type characters only')
        .trim()
        .min(3, "Title must be at least three letters long"),
    letter: string()
        .required('Type characters only')
        .trim()
        .matches(/^[A-Z]*$/, 'First letter must be Uppercase'),
})

export class NewMovie extends React.Component<{}, INewMovieState> {
    constructor(props) {
        super(props);
        this.state = {
            showMovie: false,
            filteredPlanets: [],
            addedPlanetNames:[],
            showResults: false,
            movieName: '',
            movies: [],
            planetName: '',
            planets: [],
            movieValid: false,
            formError: ''
        }
    }

    movieHandler = () => {
        this.setState(prevState => ({ showMovie: !prevState.showMovie }))
    }

    resultsHandler = () => {
        if (this.state.showResults) {
            this.setState({ showResults: false })
        }
    }

    resultsOpenHandler = () => {
        this.setState({ showResults: true })
    }

    planetNameHandler = (name, url) => {
        const addedPlanetNames = this.state.addedPlanetNames;
        const check = addedPlanetNames.includes(name);
        if (!check) {
            addedPlanetNames.push(name);
            this.setState({ addedPlanetNames })
            const planets = this.state.planets;
            planets.push(url);
            this.setState({ planets });
        }
    }

    removePlanetNameHandler = (event, name) => {
        event.preventDefault();
        const data = this.state.addedPlanetNames;
        const planetData = this.state.planets;
        const index = data.indexOf(name);
        data.splice(index, 1);
        planetData.splice(index, 1);
        this.setState({ addedPlanetNames: data, planets: planetData });
    }

    planetsHandler = event => {
        this.resultsOpenHandler();
        const name = event.target.value;
        this.setState({ planetName: name });
        const url = 'https://swapi.co/api/planets/?search=';
        axios.get(url + name)
            .then(response => {
                const planets = response.data.results;
                this.setState({ filteredPlanets: planets });
            });
    }

    movieNameHandler = (event) => {
        const movieName = event.target.value;
        const letter = movieName.charAt(0);
        validationSchema
            .validate({
                name: movieName,
                letter: letter
            })
            .then(response => {
                this.setState({ movieValid: true, formError: '' })
            })
            .catch(error => {
                this.setState({ formError: error.message, movieValid: false })
            })
        this.setState({ movieName })
    }

    addMovie = (event) => {
        event.preventDefault();
        const data = {name: this.state.movieName, planets: this.state.planets};
        const movies = this.state.movies;
        movies.push(data);
        this.setState({ movies })
        this.setState({ movieName: '', addedPlanetNames: [], planetName: '', planets: [], movieValid: false, formError: '' })
    }

    render() {
        return (
            <div className="add-movie" onClick={this.resultsHandler}>
                    <ListGroup>
                        {this.state.movies !== undefined && this.state.movies.length > 0 ?
                            this.state.movies.map((element, index) => (
                                <AsyncMoviePlanets
                                    key={index}
                                    title={element.name}
                                    planets={element.planets}
                                />
                            )) : null
                        }
                    </ListGroup>
                <div className={this.state.showMovie ? "list-group-item open" : "list-group-item"}>
                    <h5 className='add-movie_title' onClick={this.movieHandler}>Add movie</h5>
                    <div className="add-movie_container">
                        <Form onSubmit={this.addMovie}>
                            <FormGroup>
                                <Label>Movie title</Label>
                                <Input
                                    type="text"
                                    placeholder="Please enter title of the movie"
                                    name="name"
                                    value={this.state.movieName}
                                    onChange={this.movieNameHandler}
                                    autocomplete="off"
                                />
                                <span
                                    className="error-message"
                                    style={this.state.formError !== undefined && this.state.formError.length > 0 ?
                                        { display: 'block' } : { display: 'none' }
                                    }>
                                        {this.state.formError}
                                </span>
                            </FormGroup>
                            {this.state.addedPlanetNames !== undefined && this.state.addedPlanetNames.length > 0 ?
                                (this.state.addedPlanetNames.map((element, index) => (
                                    <span className="add-movie_planet-name"key={index}>{element}
                                        <button className="close" onClick={e => this.removePlanetNameHandler(e, element)}/>
                                    </span>
                                ))) : null
                            }
                            <FormGroup>
                                <Label>Add Planet</Label>
                                <Input
                                    type="text"
                                    placeholder="Search for the planet in database"
                                    value={this.state.planetName}
                                    onChange={this.planetsHandler}
                                    onClick={this.resultsOpenHandler}
                                />
                                {this.state.filteredPlanets !== undefined && this.state.filteredPlanets.length > 0 && this.state.showResults ?
                                    (
                                        <div className="add-movie_results">
                                            {this.state.filteredPlanets.map((element, index) => (
                                                <p key={index} onClick={e => this.planetNameHandler(element.name, element.url)}>{element.name}</p>
                                                ))
                                            }
                                        </div>
                                    ) : null
                                }
                            </FormGroup>
                            <Button type="submit" color="info" disabled={!this.state.movieValid}>Add Movie</Button>
                        </Form>
                    </div>
                </div>
                <h5 className="copyright">COPYRIGHT © 2019 MIRUMEE SOFTWARE</h5>
            </div>
        );
    }
}

export default NewMovie;