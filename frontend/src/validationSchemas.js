import * as yup from "yup";

export const registerSchema = yup.object().shape({
    email: yup
    .string()
    .required("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email format"),
    username: yup.string().min(3).max(20).required("Username is required"),
    password: yup.string().min(6).max(50).required("Password is required"),
});

export const loginSchema = yup.object().shape({
    username: yup.string().min(3).max(20).required("Username is required"),
    password: yup.string().min(6).max(50).required("Password is required"),
});