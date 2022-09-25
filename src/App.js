import SignUp from "./components/Pages/Signup/Signup";
import Login from "./components/Pages/Login/Login";
import { Route, Routes } from "react-router-dom";
import Welcome from "./components/Pages/Welcome";
import ForgotPasscode from "./components/Pages/Login/ForgotPasscode";


function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<SignUp />} />
        <Route exact path="/welcome" element={<Welcome />} />
        <Route exact path="/forgotpasscode" element={<ForgotPasscode />} />
      </Routes>
    </div>
  );
}

export default App;
