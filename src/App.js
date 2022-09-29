import { useEffect, useState } from "react";
import SignUp from "./components/Pages/Signup/Signup";
import Login from "./components/Pages/Login/Login";
import { Route, Routes } from "react-router-dom";
import Welcome from "./components/Pages/Welcome";
import ForgotPasscode from "./components/Pages/Login/ForgotPasscode";
import { authActions } from "./components/Store/AuthReducer";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const [id, setId] = useState(false);
  console.log(isLogin, "isLogin");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.login());
    setId(localStorage.getItem("idToken"));
    console.log(dispatch, "dispatch");
    console.log(setId, "setid");
  }, [id]);

  return (
    <div>
      <Routes>
        {!isLogin && <Route exact path="/login" element={<Login />} />}
        <Route exact path="/" element={<SignUp />} />
        {id && isLogin && <Route exact path="/welcome" element={<Welcome />} />}
        (
        <Route exact path="/forgotpasscode" element={<ForgotPasscode />} />
        )
        <Route exact path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
