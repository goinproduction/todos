import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layouts/AlertMessage';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LoginForm = () => {
    // Context
    const { loginUser } = useContext(AuthContext);

    // Local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });

    const [alert, setAlert] = useState(null);

    // destructure from local state
    // const { username, password } = loginForm;
    // Login schema
    const LoginSchema = Yup.object().shape({
        username: Yup.string()
            .email('Địa chỉ email không hợp lệ')
            .required('Vui lòng nhập email'),
        password: Yup.string()
            .min(4, 'Mật khẩu phải từ 4 đến 60 kí tự')
            .max(60, 'Mật khẩu phải từ 4 đến 60 kí tự')
            .required('Vui lòng nhập mật khẩu'),
    });
    const onChangeLoginForm = (event) =>
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

    const login = async (event) => {
        event.preventDefault();

        try {
            const loginData = await loginUser(loginForm);
            if (loginData.success) {
                // history.push('/dashboard');
            } else {
                setAlert({ type: 'danger', message: loginData.message });
                setTimeout(() => setAlert(null), 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values) => setLoginForm(values)}
        >
            {({ errors, touched }) => (
                <>
                    <Form>
                        <AlertMessage info={alert} />
                        <Field
                            name='username'
                            placeholder='Email'
                            className='input-style my-1'
                            type='email'
                        />
                        {errors.username && touched.username ? (
                            <p className='error-message'>{errors.username}</p>
                        ) : null}
                        <Field
                            name='password'
                            placeholder='Password'
                            className='input-style mb-1 mt-2'
                            type='password'
                        />
                        {errors.password && touched.password ? (
                            <p className='error-message'>{errors.password}</p>
                        ) : null}
                        <button type='submit' className='button-style'>
                            Đăng nhập
                        </button>
                    </Form>
                    <p className='mt-3'>
                        Bạn đã có tài khoản?
                        <Link to='/register'>
                            <Button variant='info' size='sm' className='ms-2'>
                                Đăng ký
                            </Button>
                        </Link>
                    </p>
                </>
            )}
        </Formik>
    );
};

export default LoginForm;
