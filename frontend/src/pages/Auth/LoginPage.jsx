import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validationSchemas";
import { loginUser } from "../../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import { useState } from "react";

function LoginPage({ setIsAuthenticated }) {
  const navigate = useNavigate();
    const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (formData) => {
    try {
        const response = await loginUser(formData);
        const token = response.data;
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        setAuthError(""); 
        navigate("/board");
    } catch (error) {
        const message = error.response?.data || "Invalid username or password";
        console.error("Login failed:", message);

        if (message.toLowerCase().includes("username") || message.toLowerCase().includes("password")) {
            setAuthError("Invalid username or password");
        } else {
            setAuthError(message);
        }

    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <input
        className={`auth-input ${errors.username ? "invalid" : ""}`}
        type="text"
        placeholder="Username"
        {...register("username")}
        />
        {errors.username && <p className="auth-error">{errors.username.message}</p>}

        <input
        className={`auth-input ${errors.password ? "invalid" : ""}`}
        type="password"
        placeholder="Password"
        {...register("password")}
        />
        {errors.password && <p className="auth-error">{errors.password.message}</p>}

        {authError && <p className="auth-error form-error">{authError}</p>}

        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
