import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Image from '../../../img/moovies_logo.png';
import './main-view.scss';

import {GenreView} from '../genre-view/genre-view';
import {DirectorView} from '../director-view/director-view';
import {LoginView} from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration-view';
// import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

class MainView extends React.Component {
    
    constructor(){
        super();
        //initial state is set to null
        this.state={
            // selectedMovie: null,
            user:null
        };
    }
    
    getMovies(token){
        axios.get('https://moovies-api.herokuapp.com/movies', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => {
            this.props.setMovies(response.data);
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if(accessToken !== null){
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
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
        localStorage.setItem('user', authData.user.Username);
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
        //movies is extracted from this.props rather than from this.state
        let {movies} = this.props;
        let {user} = this.state;

        return (
            <div>
                
                <Row>
                    <Col md={3}>
                        <img src={Image} className="moovies-logo" />                       
                    </Col>
                    <Col md={{ span: 2, offset: 7}}>
                        <button className="button" onLoggedOut={() => this.onLoggedOut(null)}>Logout</button>                      
                    </Col>
                </Row>

                {/* adding MovieCard and MovieView inside Router */}
                <Router> 
                    <Row className="main-view justify-content-md-center">

                        {/* route to MovieCard */}
                        <Route exact path="/" render={() =>{
                            
                            //rendering LoginView if there's no user, if yes, passing user details as prop to LoginView
                            if (!user) return<Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>

                            //before the movies loaded
                            if (movies.length === 0) return <div className="main-view" />;  
                            
                            //rendering moviesList
                            return <MoviesList movies={movies} />;
                        }} />
                        
                        {/* route to RegistrationView */}
                        <Route exact path="/register" render={() =>{
                            if (user) return <Redirect to="/" />
                            return <Col>
                                <RegistrationView />
                            </Col>
                        }}/>

                        {/* route to MovieView */}
                        <Route path="/movies/:movieID" render={({match, history}) => {
                            return <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieID)} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />

                        {/* route for DirectorView) */}
                        <Route path="/directors/:Name" render={({match, history}) => {
                            if (movies.length === 0) return <div className="main-view" />
                            return <Col>
                                <DirectorView director={movies.find(m => m.Director.Name === match.params.Name).Director} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />

                        {/* route for GenreView) */}
                        <Route path="/genres/:Name" render={({match, history}) => {
                            if (movies.length === 0) return <div className="main-view" />
                            return <Col>
                                <GenreView genre={movies.find(m => m.Genre.Name === match.params.Name).Genre} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />

                        {/* route for ProfileView) */}
                        <Route path="/users/:Username" render={(history) => {
                            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            if (movies.length === 0) return <div className="main-view" />
                            return <Col>
                                <ProfileView history={history} movies={movies} />
                            </Col>
                        }}  />
                    </Row>                
                </Router>

                <a className="link-source" href="https://www.freevector.com/cute-cow-and-calf-collection-vector-27274">Link to Calf image for logo</a>
            </div>
            


        );
        

    }

}


let mapStateToProps = state => {
    return {movies: state.movies}
}

export default connect(mapStateToProps, {setMovies})(MainView);