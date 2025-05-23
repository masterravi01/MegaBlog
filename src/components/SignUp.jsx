import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../features/authSlice.js";
import { Input, Button, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";

const SignUp = () => {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createAccount = async (data) => {
    try {
      console.log(data);
      setError("");
      const d = await authService.createAccount(data);
      if (d) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign Up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black.60">
          Already have an account?&nbsp;
          <Link
            className="font-medium text-primary transition-all duration-200 hover:underline"
            to="/login"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(createAccount)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              type="text"
              {...register("name", { required: true })}
            />
            <Input
              label="Password: "
              placeholder="Enter your Password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
