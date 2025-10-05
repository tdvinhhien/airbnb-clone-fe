import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    signup(data).then(() => alert("Signup success")).catch(() => alert("Signup failed"));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("name")} placeholder="Name" className="w-full border px-3 py-2 rounded" />
        <input {...register("email")} placeholder="Email" className="w-full border px-3 py-2 rounded" />
        <input type="password" {...register("password")} placeholder="Password" className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded">Signup</button>
      </form>
    </div>
  );
}
