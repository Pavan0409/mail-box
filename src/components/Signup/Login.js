import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const inputPasswordRef = useRef();

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
    ).then((res) => {
      if (res.ok) {
        alert("You're now logged In");
        return res.json();
      } else {
        return res.json().then((data) => {
          alert(data.error.message);
        });
      }
    });
    emailRef.current.value="";
    inputPasswordRef.current.value="";
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
          required
          autoComplete="on"
        />
        <input
          type="password"
          placeholder="Password"
          ref={inputPasswordRef}
          required
          autoComplete="on"
        />
        <button type="submit">Login</button>
        <div>
            <p>Create New account <Link to="/">Signup</Link> </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
