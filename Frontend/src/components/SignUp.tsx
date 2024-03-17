import { IChangeMode } from "../interfaces/IChangeMode";
import { toast, Toaster } from "react-hot-toast";
import APIClient from "../services/api-client";
import { useState } from "react";
import { IUser } from "../interfaces/IUser";
import { IAuth } from "../interfaces/IAuth";

export default function SignUp({ changeAuthMode }: IChangeMode) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IUser>({
    name: "",
    email: "",
    password: "",
  });

  // ********************************************
  // Handle the change in the values
  // ********************************************
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ********************************************
  // Handle the registeration of the the account
  // ********************************************
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const apiClient = new APIClient("register-user");
    setIsLoading(true);

    apiClient
      .post(data)
      .then((result: IAuth) => {
        toast.success(result.message);
        localStorage.setItem("token", String(result.token));

        // Optionally, use a timeout to delay the mode change after the toast appears
        setTimeout(() => changeAuthMode("activation"), 1000);
      })
      .catch((error) => {
       if (error.response) {
         toast.error(error.response.data.message);
       } else {
         toast.error("An error occurred. Please try again later.");
       }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="Auth-form-container">
      <Toaster />
      <form className="Auth-form" onSubmit={handleRegister}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span
              className="link-primary cursor-pointer"
              onClick={() => changeAuthMode("signin")}
            >
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="name"
              name="name"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control mt-1"
              placeholder="e.g example@gmail.com"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-success"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
