import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Singup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmatioRef = useRef();

    const [errors, setErros] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmatioRef.current.value,
        };

        axiosClient
            .post("/singup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status == 422) {
                    setErros(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Signup for free</h1>
                    {errors && (
                        <div className="alert" >
                            {Object.keys(errors).map((key) => (
                                <p key={key} > {errors[key][0]}</p>
                            ))}
                        </div>
                    )}

                    <input ref={nameRef} type="text" placeholder="Full Name" />
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email Address"
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password "
                    />
                    <input
                        ref={passwordConfirmatioRef}
                        type="password"
                        placeholder="Password Confirmation"
                    />
                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        Already Registered? <Link to="/login">Sing In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
