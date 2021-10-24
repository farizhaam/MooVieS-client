
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './director-view.scss';

export class DirectorView extends React.Component {
    
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
        const {director, onBackClick} =this.props;

        return (
            <div className="director-view">


                {/* showing genre names */}
                <div className="director-name">
                    <span className="label">Name: </span>
                    <span className="value">{director.Name}</span>
                </div>

                {/* showing genre descriptions */}
                <div className="director-bio">
                    <span className="label">Bio: </span>
                    <span className="value">{director.Bio}</span>
                </div>

                {/* showing genre descriptions */}
                <div className="director-birthyear">
                    <span className="label">Birthyear: </span>
                    <span className="value">{director.Birth}</span>
                </div>
                <button onClick={() => { onBackClick(null); }} variant="secondary">Back</button>
            </div>
                
        );
    }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birthyear: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};