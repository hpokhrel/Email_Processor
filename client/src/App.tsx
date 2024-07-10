import Register from "./components/Register";
import VerifyEmail from "./components/VerifyEmail";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import EmailLogs from "./components/EmailLogs";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logs" element={<EmailLogs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
