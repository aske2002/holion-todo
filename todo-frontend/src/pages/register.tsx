import React, { useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register } from "../services/auth-service";

const Register: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    
    let navigate: NavigateFunction = useNavigate();

    const initialValues = {
      username: "",
      email: "",
      password: "",
    };
  
    const validationSchema = Yup.object().shape({
      username: Yup.string()
        .test(
          "len",
          "The username must be between 3 and 20 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 3 &&
            val.toString().length <= 20
        )
        .required("Username field is required!"),
      email: Yup.string()
        .email("This is not a valid email.")
        .required("Email field is required!"),
      password: Yup.string()
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/, "Password must contain minimum 6 characters, one special character, one digit and one uppercase character.")
        .required("Password field is required!"),
    });
  
    const handleRegister = (formValue: { username: string, email: string, password: string }) => {
        const { username, email, password } = formValue;
        setLoading(true);
        register(username, email, password)
        .then((response) => {
            setLoading(false)
            navigate("/login");
        }, (error) => {
            setLoading(false)
            setMessage(error.message);
        });
    };
  
    return (
        <div className="text-center w-100">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleRegister}>
                <Form className="form-signin m-auto">
                    <img className="mb-4" src="https://holion.dk/img/logo.png" alt="" width="290" height="72"/>
                    <h1 className="h3 mb-3 font-weight-normal">Please register</h1>
                    <div className="form-floating">
                        <Field name="username" id="floatingUsername" type="text" className="form-control" placeholder="Username"/>
                        <label htmlFor="floatingUsername" className="sr-only">Username</label>
                    </div>

                    <div className="form-floating">
                        <Field name="email" id="floatingEmail" type="text" className="form-control" placeholder="Email"/>
                        <label htmlFor="floatingEmail" className="sr-only">Email address</label>
                    </div>
                    <div className="form-floating">
                        <Field name="password" id="floatingPassword" type="password" className="form-control mb-3" placeholder="Password"/>
                        <label htmlFor="floatingPassword" className="sr-only">Password</label>
                    </div>
                    <p style={{cursor: "pointer"}} onClick={() => navigate('/login')}>Login instead?</p>
                    <button className="btn btn-lg btn-primary btn-block w-100 my-3" type="submit">
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Sign up</span>
                    </button>
                    {message && (
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    )}
                    <ErrorMessage
                        name="username"
                        component="div"
                        className="alert alert-danger"
                    />
                    <ErrorMessage
                        name="email"
                        component="div"
                        className="alert alert-danger"
                    />
                    <ErrorMessage
                        name="password"
                        component="div"
                        className="alert alert-danger"
                    />
                </Form>
            </Formik>
        </div>
    );
  };
  
export default Register;