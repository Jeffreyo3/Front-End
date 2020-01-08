import React, { useState } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';

import SignUp from './SignUp';

const Login = (props) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const handleChanges = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitLogin = e => {
        e.preventDefault();
        axios
            .post("https://fish-friends-api.herokuapp.com/api/auth/login", credentials)
            .then(res => {
                console.log("handleSubmitLogin post results: ", res);
                sessionStorage.setItem("user-id", res.data.id);
                sessionStorage.setItem("token", res.data.token);
                props.history.push("/fishing-spots");

            })
            .catch(err => console.log("handleSubmitLogin Error", err));
    }



    return (
        <div>
            <form onSubmit={handleSubmitLogin}>
                <input
                    placeholder="Username"
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChanges}
                    required
                />
                <input
                    placeholder="Password"
                    type="text"
                    name="password"
                    value={credentials.password}
                    onChange={handleChanges}
                    required
                />

                <button type="submit">Log In</button>
            </form>
            <div>
                <p>Don't have an account?</p>
                <Link to="/signup">Sign Up</Link>
                <Route exact path="/signup" component={SignUp}/>
            </div>
        </div>
    )
};

export default Login;

