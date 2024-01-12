// import { Outlet, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { useFormik } from "formik";
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../logo.svg'
import * as Yup from "yup";
// const cookies = new Cookies();

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values) => {
      console.log(values);
      try {
        let formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);

        const response = await fetch("https://azul-app.com:8080/auth/login", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          try {
            const responseData = await response.json();
            const { token, email } = responseData.data;

            if (email && token) {
              Cookies.set('access_token', token);
              Cookies.set('email', email);
              navigate('/dashboard');
            } else {
              setErrorMessage('Email or Password Invalid.');
            }
          } catch (jsonError) {
            setErrorMessage('Error parsing JSON response.');
            console.error('Error parsing JSON response:', jsonError);
          }
        } else {
          try {
            const errorResponse = await response.json();
            console.error('Login failed:', errorResponse.message);
            setErrorMessage(errorResponse.message);
          } catch (jsonError) {
            setErrorMessage('Error parsing JSON error response.');
            console.error('Error parsing JSON error response:', jsonError);
          }
        }
      } catch (error) {
        setErrorMessage('Error during login API call.');
        console.error('Error during login API call:', error);
      }
    },
  });


  return (
    <div>
      <div className="Auth-form-container">
        <div className='image-block'>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <form className="Auth-form" onSubmit={formik.handleSubmit}>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className={`form-control mt-1 ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                placeholder="Enter email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="invalid-feedback">{formik.errors.email}</div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group mt-3  mb-5">
              <label>Password</label>
              <input
                type="password"
                className={`form-control mt-1 ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                placeholder="Enter password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : (
                ""
              )}
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            {/* <p className="forgot-password text-right mt-2">
            Forgot <a href="www.google.com">password?</a>
          </p> */}
          </div>
        </form>
      </div>
    </div>
  );
}