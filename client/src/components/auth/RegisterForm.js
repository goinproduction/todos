import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    return (
        <>
            <Form className="my-3">
                <Form.Group className="my-3">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                    />
                </Form.Group>
                <Form.Group className="my-3">
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        name="password"
                        required
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Register
                </Button>
            </Form>
            <p>
                Already have an account?
                <Link to="/login">
                    <Button variant="info" size="sm" className="ms-2">
                        Login
                    </Button>
                </Link>
            </p>
        </>
    );
};

export default RegisterForm;
