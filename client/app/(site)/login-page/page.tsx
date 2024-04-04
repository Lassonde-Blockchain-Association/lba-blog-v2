// ./app/(site)/login-page/page.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import image from "../../../public/image.jpg"
import Logo from "../../../public/logo.png"

const Login: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:h-screen bg-gray-50 dark:bg-[#020817]">

      {/* Image Background column */}

      <div className="hidden md:flex items-center justify-center h-screen">
        <div className="w-full h-full relative">
          <Image src={image} alt="Background" layout="fill" objectFit="cover" className="absolute inset-0"/>
        </div>
      </div>

      {/* Signin Page Column */}

      <div className="flex items-center justify-center pt-16 h-screen">
        <div className="w-full md:w-[75%]">
          <div className="p-12 md:p-8 w-full h-fit">

            <Link href="https://lassondeblockchain.vercel.app/">
              <Image alt="logo" src={Logo} className="cursor-pointer h-[50px] w-[50px] mb-3"/>
            </Link>

            <h1 className="text-4xl font-bold mb-2.5 text-gray-900 dark:text-white">Welcome back</h1>
            
            <p className="text-gray-500 dark:text-gray-300 text-base font-thin">Begin your journey here. Sign in and start crafting your digital narrative today.</p>
            
            <form action="" className="mt-6">
              {/* Email and Password Boxes Div */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label htmlFor="email" className="mb-2 text-gray-900 dark:text-white">Email</label>
                  <input type="email" className="mt-3.5 p-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 first-letter:border shadow-sm" placeholder="name@example.com" required/>
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 text-gray-900 dark:text-white">Password</label>
                  <input type="password" className="mt-3.5 p-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm" placeholder="••••••••"/>
                </div>
              </div>

              {/* Seperation Div */}

              <div className="flex items-center justify-center space-x-4 mt-6">
                <div className="border-t-2 border-gray-200 dark:border-gray-700 flex-grow"></div>
                <span className="text-gray-400">or</span>
                <div className="border-t-2 border-gray-200 dark:border-gray-700 flex-grow"></div>
              </div>

              {/* Other Signin Options (Google, Apple) */}

              <div className="mt-6">
                {/* Google */}
                <a href="#" className="flex items-center justify-center py-3 px-5 mb-5 w-full text-sm text-black dark:text-gray-400 bg-transparent dark:bg-transparent hover:bg-gray-100 hover:dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 48 48"><path fill="#ffc107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" /><path fill="#ff3d00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" /><path fill="#4caf50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" /><path fill="#1976d2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" /></svg>
                  Sign in with Google
                </a>

                {/* Apple */}
                <a href="#" className="flex items-center justify-center py-3 px-5 mb-5 w-full text-sm text-black dark:text-gray-400 bg-transparent dark:bg-transparent hover:bg-gray-100 hover:dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 dark:fill-white" viewBox="0 0 256 315"><path d="M213.803 167.03c.442 47.58 41.74 63.413 42.197 63.615c-.35 1.116-6.599 22.563-21.757 44.716c-13.104 19.153-26.705 38.235-48.13 38.63c-21.05.388-27.82-12.483-51.888-12.483c-24.061 0-31.582 12.088-51.51 12.871c-20.68.783-36.428-20.71-49.64-39.793c-27-39.033-47.633-110.3-19.928-158.406c13.763-23.89 38.36-39.017 65.056-39.405c20.307-.387 39.475 13.662 51.889 13.662c12.406 0 35.699-16.895 60.186-14.414c10.25.427 39.026 4.14 57.503 31.186c-1.49.923-34.335 20.044-33.978 59.822M174.24 50.199c10.98-13.29 18.369-31.79 16.353-50.199c-15.826.636-34.962 10.546-46.314 23.828c-10.173 11.763-19.082 30.589-16.678 48.633c17.64 1.365 35.66-8.964 46.64-22.262"/></svg>
                  Sign in with Apple
                </a>

                {/* Microsoft */}
                <a href="#" className="flex items-center justify-center py-3 px-5 w-full text-sm text-black dark:text-gray-400 bg-transparent dark:bg-transparent hover:bg-gray-100 hover:dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" x="0px" y="0px" viewBox="0 0 48 48"><path fill="#ff5722" d="M6 6H22V22H6z" transform="rotate(-180 14 14)"></path><path fill="#4caf50" d="M26 6H42V22H26z" transform="rotate(-180 34 14)"></path><path fill="#ffc107" d="M26 26H42V42H26z" transform="rotate(-180 34 34)"></path><path fill="#03a9f4" d="M6 26H22V42H6z" transform="rotate(-180 14 34)"></path></svg>                
                  Sign in with Microsoft
                </a>
              </div>
              
              {/* Other format of sign in options */}

              {/* Seperation Div

              <div className="flex items-center justify-center space-x-4 mt-6">
                <div className="border-t-2 border-gray-200 dark:border-gray-700 flex-grow"></div>
                <span className="text-gray-400">or</span>
                <div className="border-t-2 border-gray-200 dark:border-gray-700 flex-grow"></div>
              </div>

              Other Signin Options (Google, Apple, Microsoft)

              <div className="mt-4">

                <div className="text-center">
                  <p className="">Sign in with:</p>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-6">
                  Google 
                  <a href="#" className="flex items-center justify-center py-3 px-5 w-full text-sm text-black dark:text-gray-400 bg-transparent dark:bg-transparent hover:bg-gray-100 hover:dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 48 48"><path fill="#ffc107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" /><path fill="#ff3d00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" /><path fill="#4caf50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" /><path fill="#1976d2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" /></svg>
                    Google
                  </a>

                  Apple
                  <a href="#" className="flex items-center justify-center py-3 px-5 w-full text-sm text-black dark:text-gray-400 bg-transparent dark:bg-transparent hover:bg-gray-100 hover:dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 dark:fill-white" viewBox="0 0 256 315"><path d="M213.803 167.03c.442 47.58 41.74 63.413 42.197 63.615c-.35 1.116-6.599 22.563-21.757 44.716c-13.104 19.153-26.705 38.235-48.13 38.63c-21.05.388-27.82-12.483-51.888-12.483c-24.061 0-31.582 12.088-51.51 12.871c-20.68.783-36.428-20.71-49.64-39.793c-27-39.033-47.633-110.3-19.928-158.406c13.763-23.89 38.36-39.017 65.056-39.405c20.307-.387 39.475 13.662 51.889 13.662c12.406 0 35.699-16.895 60.186-14.414c10.25.427 39.026 4.14 57.503 31.186c-1.49.923-34.335 20.044-33.978 59.822M174.24 50.199c10.98-13.29 18.369-31.79 16.353-50.199c-15.826.636-34.962 10.546-46.314 23.828c-10.173 11.763-19.082 30.589-16.678 48.633c17.64 1.365 35.66-8.964 46.64-22.262"/></svg>
                    Apple
                  </a>

                  Microsoft
                  <a href="#" className="flex items-center justify-center py-3 px-5 w-full text-sm text-black dark:text-gray-400 bg-transparent dark:bg-transparent hover:bg-gray-100 hover:dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" x="0px" y="0px" viewBox="0 0 48 48"><path fill="#ff5722" d="M6 6H22V22H6z" transform="rotate(-180 14 14)"></path><path fill="#4caf50" d="M26 6H42V22H26z" transform="rotate(-180 34 14)"></path><path fill="#ffc107" d="M26 26H42V42H26z" transform="rotate(-180 34 34)"></path><path fill="#03a9f4" d="M6 26H22V42H6z" transform="rotate(-180 14 34)"></path></svg>                
                    Microsoft
                  </a>
                </div>
              </div> */}

              {/* Forgot Password */}

              <div className="flex items-center justify-between mt-5">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" className="w-4 h-4" required/>
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
              </div>

              {/* Submit Button */}

              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mt-6 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>

              {/* Signup Text */}

              <p className="text-center text-base font-light text-gray-500 dark:text-gray-400 mt-6">
                      Don&#8217;t have an account yet? <Link href="/signup-page" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</Link>
              </p>
            </form>
          </div>        
        </div>
      </div>
    </div>
  );
};

export default Login;
