"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/Container";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginImg from "../../assets/images/login/login.png";
import Image from "next/image";
import useDynamicTitle from "@/hooks/useDynamicTitle";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const form = useForm<LoginFormValues>({
    defaultValues: {},
  });
  useDynamicTitle();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function onSubmit(values: LoginFormValues) {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    console.log("login", response);

    if (response?.error) {
      console.error(response.error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    } else {
      Swal.fire({
        title: "Success!",
        text: "Login successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push(callbackUrl);
    }
  }

  return (
    <Container className="mt-14 w-full">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="flex-1 hidden lg:flex justify-center items-center">
          <Image src={loginImg} width={460} height={500} alt="loginImg" />
        </div>
        <div className="flex-1 w-full md:max-w-lg">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full mx-auto bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800"
          >
            <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">
              Login
            </h1>
            <div>
              <label className="block text-gray-700 dark:text-gray-100 text-lg font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                {...form.register("email", {
                  required: true,
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                })}
                className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg w-full p-3"
                placeholder="johndoe@whatever.com"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-100 text-lg font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...form.register("password", {
                    required: true,
                    minLength: 6,
                  })}
                  className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg w-full p-3"
                  placeholder="Password"
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <p className="block text-center text-[16px] font-medium">
              Do not have an account? <Link href={"/register"}>Sign Up</Link>
            </p>
            <div className="flex justify-center items-center">
              <Button
                type="submit"
                className="rounded-md text-white text-lg font-medium bg-[#FF3811] dark:bg-[#FF3811]"
              >
                Login
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-x-5">
              <button
                onClick={() =>
                  signIn("google", {
                    callbackUrl,
                  })
                }
                className="border border-black dark:border-gray-300 rounded-lg px-5 py-[6px]"
              >
                Sign in with Google
              </button>
              <button
                onClick={() =>
                  signIn("github", {
                    callbackUrl,
                  })
                }
                className="border border-black dark:border-gray-300 rounded-lg px-5 py-[6px] mt-2 sm:mt-0"
              >
                Sign in with GitHub
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default LoginForm;
