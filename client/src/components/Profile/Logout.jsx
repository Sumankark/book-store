import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.clear();
    };

    clearLocalStorage();
    navigate("/login");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl font-semibold">Logging out...</p>
    </div>
  );
};

export default Logout;
