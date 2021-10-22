
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './profile-view.scss';

export class ProfileView extends React.Component {
    
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
        const {user, onBackClick} =this.props;

        return (
            <div className="profile-view">


                {/* showing users's name */}
                <div className="user-name">
                    <span className="label">Name: </span>
                    <span className="value">{user.name}</span>
                </div>

                {/* showing users's username */}
                <div className="user-username">
                    <span className="label">Username: </span>
                    <span className="value">{user.Username}</span>
                </div>

                {/* showing users's email */}
                <div className="user-email">
                    <span className="label">Email: </span>
                    <span className="value">{user.Email}</span>
                </div>

                {/* showing users's birthday */}
                <div className="user-birthday">
                    <span className="label">Birthday: </span>
                    <span className="value">{user.Birthday}</span>
                </div>

                {/* showing users's favorites movies */}
                <div className="user-favorites">
                    <span className="label">Favorite list: </span>
                    <span className="value">{user.Favorites}</span>
                </div>
                <button onClick={() => { onBackClick(null); }} variant="secondary">Back</button>
            </div>
                
        );
    }
}

ProfileView.propTypes = {
    user: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.instanceOf(Date).isRequired,
        Favorites: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};