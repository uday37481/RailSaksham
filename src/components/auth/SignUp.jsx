import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Toast from "./Toast";

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [toast, setToast] = useState(null);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setToast({ message: "Please fill all fields", type: "error" });
      return;
    }
    if (form.password !== form.confirm) {
      setToast({ message: "Passwords do not match", type: "error" });
      return;
    }
    signUp(form.name, form.email, form.password);
    setToast({ message: "Account created!", type: "success" });
    setTimeout(() => navigate("/dashboard"), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-gray-900 bg-opacity-90 rounded-xl shadow-xl p-8 flex flex-col gap-5 border border-gray-800"
      >
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-400 outline-none transition-all duration-200 placeholder-gray-400 shadow-sm"
        />
        <input
          type="email"
          name="email"
          autoComplete="username"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-400 outline-none transition-all duration-200 placeholder-gray-400 shadow-sm"
        />
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-400 outline-none transition-all duration-200 placeholder-gray-400 shadow-sm"
        />
        <input
          type="password"
          name="confirm"
          autoComplete="new-password"
          placeholder="Confirm Password"
          value={form.confirm}
          onChange={handleChange}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-400 outline-none transition-all duration-200 placeholder-gray-400 shadow-sm"
        />
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all duration-200 shadow-md focus:ring-2 focus:ring-purple-400"
        >
          Register
        </button>
        <div className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/signin" className="text-purple-400 hover:underline">Sign In</Link>
        </div>
      </form>
    </div>
  );
}