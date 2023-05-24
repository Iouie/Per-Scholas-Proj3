import { useState } from "react";
import * as usersService from "../../utilities/users-service";
import { Link } from "react-router-dom";

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (evt) => {
    setCredentials({
      ...credentials,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
    } catch (err) {
      setError("Log in failed - Try Again");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="px-8 py-6 mt-4 text-left bg-sky-300 shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-white">Login</h3>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="mt-4">
            <div className="mt-4">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mt-4">
              <div>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  name="password"
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>
            </div>
            <div className="flex items-baseline justify-center">
              <button
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                type="submit"
              >
                Login
              </button>
            </div>{" "}
            <p className="text-center my-3">
              Don't have an account? Sign up
              <br />
              <Link to="/signup">
                <b className="text-xl">Here</b>
              </Link>
            </p>
            <p className="text-center my-3">&nbsp;{error.error}</p>
          </div>
        </form>
      </div>
    </div>
  );
}
