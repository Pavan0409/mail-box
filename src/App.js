import SignUp from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";


function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<SignUp />} />
        <Route exact path="/welcome" element={<Welcome />} />
      </Routes>
    </div>
  );
}

export default App;
