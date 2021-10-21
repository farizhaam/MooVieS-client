import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';

import {LoginView} from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export class MainView extends React.Component {
    
    constructor(){
        super();
        //initial state is set to null
        this.state={
            movies: [],
            selectedMovie: null,
            user:null
        };
    }
    
    componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if(accessToken !== null){
            this.setState({
                user: localStorage.getItem('user')
            });
        }
        this.getMovies(accessToken);
    }
    
    //updating state of 'selectedMovie', triggered when clicked
    setSelectedMovie(newSelectedMovie){
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    //updating 'user' property when a user is logged in
    onLoggedIn(authData){
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user);
        this.getMovies(authData.token);
    }

    //logging out user
    onLoggedOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    //get Movies when token is received
    getMovies(token){
        axios.get('https://moovies-api.herokuapp.com/movies', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => {
            this.setState({
                movies: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    render(){
        const {movies, selectedMovie, user} = this.state;

        //rendering LoginView if there's no user, if yes, passing user details as prop to LoginView
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        //before the movies loaded
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Row className="main-view justify-content-md-center">
                {selectedMovie
                    ? (
                        <Col md={8}>
                            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>                            
                        </Col>
                    ) 
                    : movies.map(movie => (
                        <Col md={3}>
                            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} /> 
                        </Col>                                
                    ))
                }
            </Row>
        );
    }

}

export default MainView;