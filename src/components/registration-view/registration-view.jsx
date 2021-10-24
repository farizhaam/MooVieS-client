import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export function RegistrationView(props){
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://moovies-api.herokuapp.com/users', {
            Name: name,
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
        .then(response => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self'); //'_self' is necessary to let the page open in current tab
        })
        .catch( e => {
            console.log('error registering the user')
        })
    };

    return(
        <Form>
            <Form>
                {/* field for Name */}
                <Form.Group controlId="forName">
                    <Form.Label>Name: </Form.Label>
                    <Form.Control type="text" placeholder="Enter fullname" value={name} onChange={e => setName(e.target.value)} /><br/>
                </Form.Group>

                {/* field for Username */}
                <Form.Group controlId="formUsername">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} /><br/>
                </Form.Group>

                {/* field for Password */}
                <Form.Group controlId="formPassword">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
                </Form.Group>

                {/* field for Email */}
                <Form.Group controlId="formEmail">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
                </Form.Group>

                {/* field for Birthday */}
                <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday: </Form.Label>
                    <Form.Control type="date" placeholder="YYYY-mm-DD" value={birthday} onChange={e => setBirthday(e.target.value)} /><br/>
                </Form.Group>

                {/* submit button */}
                <button variant="custom" type="submit" onClick={handleSubmit}>Submit</button>
            </Form>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </Form>
    );
}