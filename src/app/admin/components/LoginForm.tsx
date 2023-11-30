"use client";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // Use the signIn method from the AuthContext
  const { logIn } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    // Disable submit button until all fields are filled in
    const canSubmit = [...Object.values(allData)].every(Boolean);
    if (!canSubmit) {
      return false;
    }
    try {
      await logIn(data.email, data.password);
      router.push("/admin/dashboard");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // Destructure data from the data object
  const { ...allData } = data;

  return (
    <div className="flex items-center justify-center">
      <div className="">
        <form action="" onSubmit={handleLogin} className="group">
          <h5 className="">Login</h5>
          <p className="">Please enter your login credentials to login to the dashboard.</p>
          <div className="mb-5">
            <label htmlFor="email" className="">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
              autoComplete="off"
              required
              pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              placeholder="name@company.com"
              onChange={(e: any) => {
                setData({
                  ...data,
                  email: e.target.value,
                });
              }}
            />
            <span className="">Please enter a valid email address. </span>
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="">
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
              pattern=".{8,}"
              required
              onChange={(e: any) => {
                setData({
                  ...data,
                  password: e.target.value,
                });
              }}
            />
            <span className="">Password must be at least 8 characters. </span>
          </div>

          <button type="submit" className="">
            Login to your account
          </button>

          <div className="">
            <NextLink href="/register" className="">
              Register
            </NextLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
