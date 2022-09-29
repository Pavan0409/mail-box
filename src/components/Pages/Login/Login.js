import React, { useRef } from "react";
import { Link } from "react-router-dom";
import classes from "./Login.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store/AuthReducer";


const Login = () => {
  const emailRef = useRef();
  const inputPasswordRef = useRef();
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBzXTTsv5ogv__iF-ArD-Q7HWZvBCfRbMI",
      {
        method: "Post",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          alert("You're now logged In");
          return res.json();
        } else {
          return res.json().then((data) => {
            alert(data.error.message);
          });
        }
      })
      .then((data) => {
        localStorage.setItem("idToken", data.idToken);
        dispatch(authActions.login(data.idToken));
        dispatch(authActions.setEmail(data.email));
        dispatch(authActions.setCleanEmail(data.email.replace(/[^a-zA-Z]/g,"")));
        window.location.href = "/welcome";
      });
    emailRef.current.value = "";
    inputPasswordRef.current.value = "";
    
  };

  return (
    <div className={classes.loginbox}>
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
        <div className={classes.user_box}>
          <input
            type="email"
            placeholder="Email"
            ref={emailRef}
            required
            autoComplete="on"
          />
          {/* <label>Email</label> */}
        </div>
        <div className={classes.user_box}>
          {/* <label>Password</label> */}{" "}
          <input
            type="password"
            placeholder="Password"
            ref={inputPasswordRef}
            required
            autoComplete="on"
          />
        </div>
        <div className={classes.btn}>
          <button type="submit">Login</button>
        </div>
        <Link  to="/forgotpasscode">Forgot Passcode</Link>
        <p>
          Create New account <Link to="/">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
