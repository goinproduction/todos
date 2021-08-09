import React, { useContext } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { AuthContext } from '../contexts/AuthContext';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const Auth = ({ authRoute }) => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    let body;

    if (authLoading) {
        body = (
            <div className="d-flex justify-content-ClientRequest mt-2">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    } else {
        body = (
            <>
                {authRoute === 'login' && <LoginForm />}
                {authRoute === 'register' && <RegisterForm />}
            </>
        );
    }

    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>Learning</h1>
                    <h4>Kepp track what you are learning</h4>
                    {body}
                </div>
            </div>
        </div>
    );
};

export default Auth;
