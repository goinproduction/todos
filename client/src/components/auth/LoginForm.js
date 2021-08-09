import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const LoginForm = () => {
    // Context
    const { loginUser } = useContext(AuthContext);

    // Local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });
    // Router
    const history = useHistory();

    // destructure from local state
    const { username, password } = loginForm;

    const onChangeLoginForm = (event) =>
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

    const login = async (event) => {
        event.preventDefault();

        try {
            const loginData = await loginUser(loginForm);
            if (loginData.success) {
                history.push('/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Form className="my-3" onSubmit={login}>
                <Form.Group className="my-3">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button variant="success" type="submit" className="my-3">
                    Login
                </Button>
            </Form>
            <p>
                Don't have an account?
                <Link to="/register">
                    <Button variant="info" size="sm" className="ms-2">
                        Register
                    </Button>
                </Link>
            </p>
        </>
    );
};

export default LoginForm;
