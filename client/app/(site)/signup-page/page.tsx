"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/logo.png";
import image from "../../../public/image.jpg";
import { trpcClient } from "../(lib)/trpc";
import { TRPCClientError } from "@trpc/client";

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // State to control the modal
  const [modalMessage, setModalMessage] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await trpcClient.auth.signUp.mutate({
        firstName: firstName,
        email: email,
        password: password,
        lastName: lastName,
      });

        setModalMessage("Welcome!! Login to Start Contributing");
        setIsModalVisible(true);

        // Reset Input Fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
      
    } catch (err) {
      if (err instanceof TRPCClientError) {
        console.log(err);
        // Check if the error message contains "Bad Request"
        if (err.message.includes("Bad Request")) {
          setModalMessage("This user already exists!! Try logging in from the login page!!");
        } else {
          // This is for error in the Password or the input arguments (First Name & LastName etc)
          try {
            const errors = JSON.parse(err.message);
            const errorMessageString = errors
              .map((item) => `${item.path.join(": ")}: ${item.message}`)
              .join("\n");
            setModalMessage(errorMessageString);
          } catch (parseError) {
            setModalMessage(err.message);
          }
        }
        setIsModalVisible(true);
      } else {
        throw err;
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-fit bg-gray-50 dark:bg-[#020817]">
      {/* Image Background column */}
      <div className="hidden md:flex items-center justify-center h-full">
        <div className="w-full h-full relative">
          <Image
            src={image}
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
        </div>
      </div>

      {/* Signup Page Column */}
      <div className="flex items-center justify-center pt-16 pb-12 h-fit">
        <div className="w-full md:w-[85%]">
          <div className="p-10 md:p-8 w-full h-fit">
            <h1 className="text-4xl font-bold mb-2.5 text-gray-900 dark:text-white">
              Welcome
            </h1>
            <p className="text-gray-500 dark:text-gray-300 text-base font-thin">
              Begin your journey here. Sign in and start crafting your digital
              narrative today.
            </p>
            <form action="" className="mt-6" onSubmit={handleSubmit}>
              <div className="grid grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 gap-x-6 gap-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 text-gray-900 dark:text-white">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-3.5 p-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm"
                    placeholder="e.g. George"
                    required
                  />
                </div>
                <div className="relative">
                  <label htmlFor="confirmPassword" className="mb-2 text-gray-900 dark:text-white">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-3.5 p-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm"
                    placeholder="e.g. Russell"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-3.5 p-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-3.5 p-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mt-9 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create Account
              </button>
              <p className="text-center text-base font-light text-gray-500 dark:text-gray-400 mt-6">
                Already have an account?{" "}
                <Link
                  href="/login-page"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Login here
                </Link>
              </p>
              <div className="flex items-center justify-center space-x-4 mt-4">
                <div className="border-t-2 border-gray-200 dark:border-gray-700 flex-grow"></div>
                <span className="text-gray-400">or</span>
                <div className="border-t-2 border-gray-200 dark:border-gray-700 flex-grow"></div>
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="flex items-center justify-center py-3 px-5 mb-5 w-full text-sm text-black dark:text-gray-400 bg-transparent dark:bg-transparent hover:bg-gray-100 hover:dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#ffc107"
                      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                    />
                    <path
                      fill="#ff3d00"
                      d="M6.306 14.691l6.573 4.822C14.861 16.228 19.09 14 24 14c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4c-7.519 0-13.94 4.242-17.694 10.691"
                    />
                    <path
                      fill="#4caf50"
                      d="M24 44c5.138 0 9.794-1.96 13.333-5.167l-6.04-5.167C28.721 35.878 26.442 36.942 24 37c-5.192-.126-9.57-3.51-11.231-8.222l-6.4 4.934C10.155 39.802 16.606 44 24 44"
                    />
                    <path
                      fill="#1976d2"
                      d="M43.611 20.083H42V20H24v8h11.303c-.828 2.341-2.304 4.35-4.218 5.826c.021-.015 6.038 5.167 6.038 5.167C41.334 34.22 44 29.34 44 24c0-1.341-.138-2.65-.389-3.917"
                    />
                  </svg>
                  Sign up with Google
                </a>
                {/* Apple */}
                <a
                  href="#"
                  className="flex items-center justify-center py-3 px-5 mb-5 w-full text-sm text-black dark:text-gray-400 bg-transparent dark:bg-transparent hover:bg-gray-100 hover:dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2 dark:fill-white"
                    viewBox="0 0 256 315"
                  >
                    <path d="M213.803 167.03c.442 47.58 41.74 63.413 42.197 63.615c-.35 1.116-6.599 22.563-21.757 44.716c-13.104 19.153-26.705 38.235-48.13 38.63c-21.05.388-27.82-12.483-51.888-12.483c-24.061 0-31.582 12.088-51.51 12.871c-20.68.783-36.428-20.71-49.64-39.793c-27-39.033-47.633-110.3-19.928-158.406c13.763-23.89 38.36-39.017 65.056-39.405c20.307-.387 39.475 13.662 51.889 13.662c12.406 0 35.699-16.895 60.186-14.414c10.25.427 39.026 4.14 57.503 31.186c-1.49.923-34.335 20.044-33.978 59.822M174.24 50.199c10.98-13.29 18.369-31.79 16.353-50.199c-15.826.636-34.962 10.546-46.314 23.828c-10.173 11.763-19.082 30.589-16.678 48.633c17.64 1.365 35.66-8.964 46.64-22.262" />
                  </svg>
                  Sign in with Apple
                </a>

                {/* Microsoft */}
                <a
                  href="#"
                  className="flex items-center justify-center py-3 px-5 w-full text-sm text-black dark:text-gray-400 bg-transparent dark:bg-transparent hover:bg-gray-100 hover:dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2"
                    x="0px"
                    y="0px"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#ff5722"
                      d="M6 6H22V22H6z"
                      transform="rotate(-180 14 14)"
                    ></path>
                    <path
                      fill="#4caf50"
                      d="M26 6H42V22H26z"
                      transform="rotate(-180 34 14)"
                    ></path>
                    <path
                      fill="#ffc107"
                      d="M26 26H42V42H26z"
                      transform="rotate(-180 34 34)"
                    ></path>
                    <path
                      fill="#03a9f4"
                      d="M6 26H22V42H6z"
                      transform="rotate(-180 14 34)"
                    ></path>
                  </svg>
                  Sign in with Microsoft
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      import Link from 'next/link';

      {/* Modal */}
      
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <p className="mt-2 text-gray-600 dark:text-gray-300 font-bold text-xl">{modalMessage}</p>
            <div className="flex justify-between">
              {modalMessage === "Welcome!! Login to Start Contributing" && (
                <Link 
                  href="/login-page"
                  className="mt-6 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setIsModalVisible(false)}
                >
                  Login
                </Link>
              )}
              <button
                onClick={() => setIsModalVisible(false)}
                className="mt-6 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
