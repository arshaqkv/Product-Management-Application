import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type React from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "../api/axiosIntance";

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedin") === "true") {
      navigate("/");
    }
  }, []);

  const formik = useFormik<SignupFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/[a-z]/, "Must contain at least one lowercase letter")
        .matches(/\d/, "Must contain at least one number")
        .matches(
          /[@$!%*?&]/,
          "Must contain at least one special character (@, $, !, %, *, ?, &)"
        ),
    }),
    onSubmit: async (values) => {
      const trimmedValues = {
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      };

      try {
        const response = await axios.post("/auth/signup", trimmedValues);
        toast.success(response.data.message);
        navigate("/login");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Signup failed");
      }
    },
  });
  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="text-white flex flex-col justify-center items-center w-3xl bg-[url('./assets/bg-1.png')] bg-cover bg-no-repeat">
        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
        <p className="max-w-62 text-center mb-10">
          To keep connected with us please login with your personal info
        </p>
        <Button
          onClick={() => navigate("/login")}
          type="button"
          className="w-40 py-6 rounded-full bg-transparent border border-white hover:bg-gray-300 hover:text-black"
        >
          SIGN IN
        </Button>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center w-full px-10">
        <h1 className="text-4xl font-bold text-amber-500 mb-10">
          Create Account
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-xs space-y-6 text-center"
        >
          {/* Name Field */}
          <div className="relative">
            <User className="absolute top-4.5 left-2 -translate-y-1/2 text-gray-500" />
            <Input
              name="name"
              type="text"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`pl-10 ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute top-4.5 left-2 -translate-y-1/2 text-gray-500" />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`pl-10 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute top-4.5 left-2 -translate-y-1/2 text-gray-500" />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`pl-10 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Signup Button */}
          <Button className="bg-amber-500 py-6 w-50 rounded-full hover:bg-amber-400 hover:text-white">
            SIGN UP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
