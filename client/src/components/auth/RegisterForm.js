import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layouts/AlertMessage';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const RegisterForm = () => {
    // Context
    const { registerUser } = useContext(AuthContext);
    const RegisterSchema = Yup.object().shape({
        username: Yup.string()
            .email('Địa chỉ email không hợp lệ')
            .required('Vui lòng nhập email'),
        password: Yup.string()
            .min(4, 'Mật khẩu phải từ 4 đến 60 kí tự')
            .max(60, 'Mật khẩu phải từ 4 đến 60 kí tự')
            .required('Vui lòng nhập mật khẩu'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu chưa khớp')
            .required('Vui lòng nhập trường này'),
    });
    const register = async (data) => {
        try {
            const registerData = await registerUser(data);
            if (!registerData.success) {
                setAlert({ type: 'danger', message: registerData.message });
                setTimeout(() => setAlert(null), 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const [alert, setAlert] = useState(null);
    return (
        <Formik
            initialValues={{ username: '', password: '', confirmPassword: '' }}
            validationSchema={RegisterSchema}
            onSubmit={ values => {           
                register(values);
            }}
        >
            {({ errors, touched }) => (
                <>
                    <Form>
                        <AlertMessage info={alert} />
                        <Field
                            name='username'
                            placeholder='Địa chỉ email'
                            className='input-style my-1'
                            type='email'
                        />
                        {errors.username && touched.username ? (
                            <p className='error-message'>{errors.username}</p>
                        ) : null}
                        <Field
                            name='password'
                            placeholder='Mật khẩu'
                            className='input-style mb-1 mt-2'
                            type='password'
                        />
                        {errors.password && touched.password ? (
                            <p className='error-message'>{errors.password}</p>
                        ) : null}
                        <Field
                            name='confirmPassword'
                            placeholder='Nhập lại mật khẩu'
                            className='input-style mb-1 mt-2'
                            type='password'
                        />
                        {errors.confirmPassword && touched.confirmPassword ? (
                            <p className='error-message'>
                                {errors.confirmPassword}
                            </p>
                        ) : null}
                        <button type='submit' className='button-style'>
                            Đăng ký
                        </button>
                    </Form>
                    <p className='mt-3'>
                        Bạn đã có tài khoản?
                        <Link to='/login'>
                            <Button variant='info' size='sm' className='ms-2'>
                                Đăng nhập
                            </Button>
                        </Link>
                    </p>
                </>
            )}
        </Formik>
    );
};

export default RegisterForm;
