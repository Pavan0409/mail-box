import React, { useRef } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const emailRef = useRef();
  const inputPasswordRef = useRef();
  const inputConfirmPasswordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    if (enteredPassword !== inputConfirmPasswordRef.current.value) {
      alert("Password is not same");
      return;
    }
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBzXTTsv5ogv__iF-ArD-Q7HWZvBCfRbMI",
      {
        method: "POST",
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
        alert("Resgistered successfully");
        console.log("registered done!");
        // return res.json();
      } else {
        return res.json().then((data) => {
          alert(data.error.message);
        });
      }
    });
    emailRef.current.value = "";
    inputPasswordRef.current.value = "";
    inputConfirmPasswordRef.current.value = "";
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h2>Sign Up</h2>
        <div>
          <input
            type="email"
            placeholder="Email"
            ref={emailRef}
            autoComplete="on"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            ref={inputPasswordRef}
            required
            autoComplete="on"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            ref={inputConfirmPasswordRef}
            autoComplete="on"
            required
          />
        </div>
        <button type="submit">Submit</button>
        <div>
            <p>Already Resgistered? <Link to="/login">Login</Link> </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
