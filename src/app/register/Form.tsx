"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RegisterFormValues } from "@/types";
import loginImg from "../../assets/images/login/login.png";
import Image from "next/image";
import Container from "@/components/Container";
import useDynamicTitle from "@/hooks/useDynamicTitle";

const RegisterForm = () => {
  const router = useRouter();
  useDynamicTitle();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const form = useForm<RegisterFormValues>({
    defaultValues: {},
  });

  async function onSubmit(values: RegisterFormValues) {
    if (values.password !== values.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    setPasswordsMatch(true);
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify(values),
    });

    const data = await response.json();
    console.log(data);

    if (data.error) {
      console.error(data.error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    } else {
      Swal.fire({
        title: "Success!",
        text: "Registered successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/login");
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
            className="space-y-6 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800"
          >
            <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">
              Sign Up
            </h1>
            <div>
              <label className="block text-gray-700 dark:text-gray-100 text-lg font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                {...form.register("name", { required: true })}
                className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg w-full p-3"
                placeholder="John Doe"
                required
              />
            </div>
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
                  {...form.register("password", { required: true, minLength: 6 })}
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
            <div>
              <label className="block text-gray-700 dark:text-gray-100 text-lg font-semibold mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...form.register("confirmPassword", { required: true, minLength: 6 })}
                  className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg w-full p-3"
                  placeholder="Confirm Password"
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                {!passwordsMatch && (
                  <span className="text-red-600 text-sm mt-1">
                    Password and Confirm Password do not match
                  </span>
                )}
              </div>
            </div>
            <p className="block text-center text-[16px] font-medium">
              Already have an account? <Link href={"/login"}>Login</Link>
            </p>
            <div className="flex justify-center items-center">
              <Button
                type="submit"
                className="rounded-md text-white text-lg font-medium bg-[#FF3811] dark:bg-[#FF3811]"
              >
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default RegisterForm;
