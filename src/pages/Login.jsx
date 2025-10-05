import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    login(data).catch(() => alert("Login failed"));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("email")} placeholder="Email" className="w-full border px-3 py-2 rounded" />
        <input type="password" {...register("password")} placeholder="Password" className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
