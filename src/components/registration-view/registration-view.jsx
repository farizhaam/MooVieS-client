import React, {useState} from 'react';

export function RegistrationView(props){
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, username, password. birthdate);
        props.onRegistration(username);
    };

    return(
        <form>
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Birthdate:
                <input type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
}