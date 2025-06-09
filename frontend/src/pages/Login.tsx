import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "../api/axiosIntance";
import { useEffect } from "react";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("isLoggedin") === "true"){
        navigate("/")
    }
  }, [])

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const trimmedValues = {
        email: values.email.trim(),
        password: values.password,
      };

      try {
        const response = await axios.post("/auth/login", trimmedValues)
        toast.success(response.data.message)
        localStorage.setItem("isLoggedin", "true")
        navigate("/")
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Login failed");
      }
    },
  });

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center w-full px-10">
        <h1 className="text-4xl max-w-60 text-center font-bold text-amber-500 mb-10">
          Sign In To Your Account
        </h1>

        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-xs space-y-6 text-center"
        >
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

          <p className="font-bold underline">Forgot password?</p>

          <Button
            type="submit"
            className="bg-amber-500 w-50 py-6 rounded-full hover:bg-amber-400 hover:text-white"
          >
            SIGN IN
          </Button>
        </form>
      </div>

      {/* Right Side */}
      <div className="text-white flex flex-col justify-center items-center w-3xl bg-[url('./assets/bg-1.png')] bg-cover bg-no-repeat">
        <h1 className="text-4xl font-bold mb-4">Hello Friend!</h1>
        <p className="max-w-62 text-center mb-10">
          Enter your personal details and start your journey with us
        </p>

        <Button
          onClick={() => navigate("/signup")}
          type="button"
          className="w-40 rounded-full py-6 bg-transparent border border-white hover:bg-gray-300 hover:text-black"
        >
          SIGN UP
        </Button>
      </div>
    </div>
  );
};

export default Login;
