import React from 'react';
import axios from 'axios';

import {BrowserRouter as Router, Route} from 'react-router-dom';

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
            // selectedMovie: null,
            user:null
        };
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
    // setSelectedMovie(newSelectedMovie){
    //     this.setState({
    //         selectedMovie: newSelectedMovie
    //     });
    // }

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

    render(){
        const {movies, user} = this.state;



        //before the movies loaded
        if (movies.length === 0) return <div className="main-view" />;

        //logout button
        <button onClick={() => {this.onLoggedOut()}}>Logout</button>

        return (
            //adding MovieCard and MovieView inside Router
            <Router> 
                <Row className="main-view justify-content-md-center">
                    
                    {/* route to MovieCard */}
                    <Route exact path="/" render={() =>{
                        
                        //rendering LoginView if there's no user, if yes, passing user details as prop to LoginView
                        if (!user) return<Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                        </Col>

                        //rendering movieCard is login is successful
                        return movies.map(m => (
                            <Col md={3} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                        ))
                    }} />
                    
                    {/* route to RegistrationView */}
                    <Route exact path="/register" render={() =>{
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }}/>

                    {/* route to MovieView */}
                    <Route path="/movies/:movieId" render={({match, history}) => {
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    {/* route for DirectorView) */}
                    <Route path="/directors/:name" render={({match, history}) => {
                        if (movies.length === 0) return <div className="main-view" />
                        return <Col>
                            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    {/* route for GenreView) */}
                    <Route path="/genres/:name" render={({match, history}) => {
                        if (movies.length === 0) return <div className="main-view" />
                        return <Col>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                </Row>                
            </Router>

        );
        

    }

}

export default MainView;