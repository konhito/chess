import { useState } from "react";
import { Navigate } from "react-router-dom";

import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authPass, setAuthPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/authCheck", {
        firstName: username,
        lastName: password, //body
      });

      if (response.data.success) {
        setAuthPass(true); //true herer---
      } else {
        alert("Authentication failed!");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (authPass) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex justify-center items-center mt-52 w-full">
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              id="username"
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-md  p-2 border border-gray-300"
            />
          </div>
          <div>
            <input
              id="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md p-2 border border-gray-300"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-white text-black w-full py-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
