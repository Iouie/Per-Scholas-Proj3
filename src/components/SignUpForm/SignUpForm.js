import { Component } from "react";
import { signUp } from "../../utilities/users-service";
import { Link } from "react-router-dom";

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  // The object passed to setState is merged with the current state object
  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  handleSubmit = async (evt) => {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // We don't want to send the 'error' or 'confirm' property,
      //  so let's make a copy of the state object, then delete them
      const formData = { ...this.state };
      delete formData.error;
      delete formData.confirm;

      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      // Baby step!
      this.props.setUser(user);
    } catch {
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-sky-300 shadow-lg rounded-lg">
          <h3 className="text-2xl font-bold text-center text-white">Sign Up</h3>
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <div className="mt-4">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mt-4">
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mt-4">
                <div>
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={this.state.confirm}
                    name="confirm"
                    onChange={this.handleChange}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>
              <div className="flex items-baseline justify-center">
                <button
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                  type="submit"
                  disabled={disable}
                >
                  Sign Up
                </button>
              </div>
              <p className="text-center my-3">
                Already have an account? Login
                <br />
                <Link to="/login">
                  <b className="text-xl">Here</b>
                </Link>
              </p>
              <p className="text-center my-3">&nbsp;{this.state.error}</p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
