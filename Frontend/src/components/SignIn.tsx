import { useState } from "react";
import { IUser } from "../interfaces/IUser";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { IChangeMode } from "../interfaces/IChangeMode";
import { LoginService } from "../services/login.service";

export default function SignIn({ changeAuthMode }: IChangeMode) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IUser>({
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
  // Handle the login to the the account
  // ********************************************
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    LoginService(data, (error?: string, result?: string) => {
      if (result) {
        // login successfully
        toast.success(result);
        setIsLoading(false);

        setTimeout(() => navigate("/home"), 2000);
      } else if (error) {
        // error occur
        toast.error(error);
        setIsLoading(false);
      }
    });
  };

  return (
    <div className="Auth-form-container">
      <Toaster />
      <form className="Auth-form" onSubmit={handleLogin}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span
              className="link-primary cursor-pointer"
              onClick={() => changeAuthMode("signup")}
            >
              Sign Up
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g example@gmail.com"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
