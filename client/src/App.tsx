import Dashboard from "./components/Dashboard";
import EmailLogs from "./components/EmailLogs";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logs" element={<EmailLogs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
