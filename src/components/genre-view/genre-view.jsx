
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './genre-view.scss';

export class GenreView extends React.Component {
    
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
        const {genre, onBackClick} =this.props;

        return (
            <div className="genre-view">


                {/* showing genre names */}
                <div className="genre-name">
                    <span className="label">Name: </span>
                    <span className="value">{genre.Name}</span>
                </div>

                {/* showing genre descriptions */}
                <div className="genre-description">
                    <span className="label">Description: </span>
                    <span className="value">{genre.Description}</span>
                </div>

                <button onClick={() => { onBackClick(null); }} variant="secondary">Back</button>
            </div>
                
        );
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};