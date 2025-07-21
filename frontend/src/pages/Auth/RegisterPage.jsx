
import { registerUser } from "../../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import { registerSchema } from "../../validationSchemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function RegisterPage(){
    const navigate = useNavigate();

    const {register, handleSubmit, setError, formState: { errors }, } = useForm({resolver:yupResolver(registerSchema)});

    const onSubmit = async (formData) =>{
        try{
            const response = await registerUser(formData);
            const token = response.data;
            localStorage.setItem("token", token);
            navigate("/board");
        }catch(error){
            const message =error.response?.data || "Something went wrong";
            console.error("Registration failed: ", message);
            
            if (message.includes("Username")) {
                setError("username", { message });
            } else if (message.includes("Email")) {
                setError("email", { message });
            } else {
                alert("Registration failed: " + message);
            }
        }
    }

    return (
        <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <input
            className={`auth-input ${errors.email ? "invalid" : ""}`}
            type="text"
            placeholder="Email"
            {...register("email")}
            />
            {errors.email && <p className="auth-error">{errors.email.message}</p>}

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


                <button type="submit">Register</button>
                <p>
                Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
}

export default RegisterPage;