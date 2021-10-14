import React from "react";

import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor(){
        super();
        this.state={
            movies: [
                { 
                    _id: 1, Title: 'Inception', 
                    Description: 'The film stars Leonardo DiCaprio as a professional thief who steals information by infiltrating the subconscious of his targets. He is offered a chance to have his criminal history erased as payment for the implantation of another person\'s idea into a target\'s subconscious.', 
                    ImagePath: '...'
                },
                { 
                    _id: 2, 
                    Title: 'The Shawshank Redemption', 
                    Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit.', 
                    ImagePath: '...'
                },
                { 
                    _id: 3, 
                    Title: 'Gladiator', 
                    Description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery. Maximus is a powerful Roman general, loved by the people and the aging Emperor, Marcus Aurelius. Maximus is then relegated to fighting to the death in the gladiator arenas.', 
                    ImagePath: '...'
                }
            ],
            selectedMovie: null
        };
    }
    
    setSelectedMovie(newSelectedMovie){
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render(){
        const {movies, selectedMovie} = this.state;


        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                    : movies.map(movie => (<MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} /> ))
                }
            </div>
        );
    }

}

export default MainView;