import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { hitApi } from "../services/hitapi";

const VerifyUser = () => {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const token = query.get("token");
  const [loading, setLoading] = useState(false);

  let userVerify = async () => {
    try {
      let result = await hitApi({
        url: "http://localhost:8080/users/verify-user",
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/login");
    } catch (error) {
      console.error("Verification failed: ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      userVerify();
    } else {
      console.error("No token found in URL.");
      setLoading(false);
    }
  }, [token]);
  return (
    <div>
      {loading ? (
        <p>Verifying your email...</p>
      ) : (
        <p>Verification process complete</p>
      )}
    </div>
  );
};

export default VerifyUser;
