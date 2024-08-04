import React from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/service/auth-api";
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      await login(data).unwrap();
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed!");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <input
            className="w-full p-4 rounded bg-blue-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email")}
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full p-4 rounded bg-blue-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password")}
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          className="w-full p-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;

