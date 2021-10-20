import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login-view.scss';

export function LoginView(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        //send a request to the server for authentication, then call this props
        props.onLoggedIn(username);
    };

    return(
        <div className="container">
            <h1>Welcome to <span className="moovies">MooVieS</span>!</h1><br />
            <h2>Please login here to gain access to your account.</h2><br/>
            <h4>Login</h4>
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} /><br/>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} /><br/>
                </Form.Group>
                <button variant="custom" type="submit" onClick={handleSubmit}>Submit</button>
            </Form>
        </div>

    );
}