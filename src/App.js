import SignUp from "./components/Signup/Signup";
import Login from "./components/Signup/Login";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
