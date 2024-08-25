"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DoctorLogin() {
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkCookie = async () => {
      const isCookiePresent = await axios.get("/api/checkCookie");
      if (isCookiePresent.data.result) {
        router.push("/dashboard");
      }
    };

    checkCookie();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/doctor-login", {
        contact,
        password,
      });

      if (response.status === 200) {
        router.push("/dashboard");
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Doctor Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact"
            required
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Log In
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
