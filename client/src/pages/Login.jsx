import React, { useContext, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { GlobalVariableContext } from "../App";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { hitApi } from "../services/hitapi";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const global = useContext(GlobalVariableContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate email domain
    const emailDomain = data.email.split("@")[1];
    if (emailDomain !== "gmail.com") {
      setError("Only Gmail addresses are allowed.");
      return;
    }

    try {
      const response = await hitApi.post("/users/signin", data);
      let token = response.data.token;
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.result.role));
      localStorage.setItem("token", token);
      localStorage.setItem("id", response.data.result._id);
      localStorage.setItem("role", response.data.result.role);

      global.setToken(token);
      navigate("/profile");
    } catch (error) {
      setError("Signup failed. Please try again.");
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Log In</h2>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mt-2">{success}</p>
        )}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="flex ">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
              <button
                className="p-3 border border-gray-300 rounded mt-1"
                type="button"
                onClick={handleTogglePassword}
              >
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition duration-200"
          >
            Log In
          </button>
        </form>
        <div className="text-center m-4">
          <p className="font-semibold m-2">Or</p>
          <p>
            Don't have an account? <Link to={"/signup"}>SignUp</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
