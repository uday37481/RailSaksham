import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Toast from "./Toast";

export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [toast, setToast] = useState(null);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setToast({ message: "Please fill all fields", type: "error" });
      return;
    }
    signIn(form.email, form.password);
    setToast({ message: "Signed in successfully!", type: "success" });
    setTimeout(() => navigate("/dashboard"), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-gray-900 bg-opacity-90 rounded-xl shadow-xl p-8 flex flex-col gap-6 border border-gray-800"
      >
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Sign In</h2>
        <input
          type="email"
          name="email"
          autoComplete="username"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border-2 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200 placeholder-gray-400 shadow-sm"
        />
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border-2 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200 placeholder-gray-400 shadow-sm"
        />
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all duration-200 shadow-md focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
        <div className="text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}