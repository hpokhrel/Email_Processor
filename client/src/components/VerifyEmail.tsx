import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(`/api/auth/verify/${token}`);
        setMessage(res.data);
      } catch (err) {
        setMessage("Email verification failed");
      }
    };
    verifyEmail();
  }, [token]);

  return (
    <div className="container">
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
