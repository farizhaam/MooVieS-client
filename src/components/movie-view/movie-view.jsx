
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';

export class MovieView extends React.Component {
    
    //keypress event
    keypressCallback(event) {
        console.log(event.key);
    }

    //addinng keypress event
    componentDidMount(){
        document.addEventListener('keypress', this.keypressCallback);
    }

    //removing the keypress event
    componentWillUnmount(){
        document.removeEventListener('keypress', this.keypressCallback);
    }
    
    render(){
        const {movie, onBackClick} =this.props;

        return (
            <div className="movie-view">

                {/* showing movie posters */}
                <div className="movie-poster">
                    <img src={movie.ImagePath} />
                </div>

                {/* showing movie titles */}
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>

                {/* showing movie descriptions */}
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>

                {/* link to movie's director info */}
                <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">Director</Button>
                </Link>

                {/* link to movie's genre info */}
                <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">Genre</Button>
                </Link>

                <button onClick={() => { onBackClick(null); }} variant="secondary">Back</button>
            </div>
                
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};