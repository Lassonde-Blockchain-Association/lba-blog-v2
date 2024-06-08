"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import marker from "../components/lib/marker.gif";
import Logo from "../../../public/logo.png";
import { trpcClient } from "../(lib)/trpc";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./Sheets";
import { useTheme } from "next-themes";
import { MdDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";
import SelectedCategorySingleton from "../components/globalSelectedCategory";

const Navbar = () => {
  function resetCategory() {
    SelectedCategorySingleton.resetSelectedCategory();
  }

  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const tokenValidation = await trpcClient.auth.verifyToken.mutate(document.cookie);
      
      setTokenValid(tokenValidation.code === 200 && tokenValidation.validToken);
    };

    validateToken();
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      <div className="container mx-auto sm:px-4">
        <div className="fixed backdrop-blur-sm bg-white/75 z-50 top-0 left-0 right-0 h-fits dark:bg-slate-900/75 shadow-sm flex items-center justify-between">
          <div className="container flex justify-between m-auto items-center">
            <div className="flex items-center gap-4 z-50 left-">
              <Link
                href="https://lassondeblockchain.vercel.app/"
                className=""
              >
                <Image
                  alt="logo"
                  src={Logo}
                  className="cursor-pointer hover:shadow-lg transform duration-150 h-[50px] w-[50px] hover:h-[60px] hover:w-[60px]"
                />
              </Link>
              <span className="text-slate-700 dark:text-white text-4xl">/</span>
              <Link
                href="\"
                className="dark:text-white text-slate-700 cursor-pointer text-xl hover:text-orange-300 dark:hover:text-orange-300  transform duration-150"
              >
                LBA - Blog
              </Link>
            </div>
            <div className="flex items-center justify-between ">
              <div className="p-2.5">
                <Link href={tokenValid ? "/submit-form" : "#"}>
                  <button
                    className={`bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                      tokenValid ? "hover:bg-gray-500" : "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={!tokenValid}
                  >
                    Create Blog
                  </button>
                </Link>
              </div>
              <div className="p-2.5">
                <Link href="/login-page">
                  <button className=" bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Login
                  </button>
                </Link>
              </div>

              <div className="cursor-pointer flex justify-end lg:mx-12 md:mx-8 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                {currentTheme === "dark" ? (
                  <button
                    onClick={() => setTheme("light")}
                    className="leading-9 text-x1 rounded-full m-1 text-orange-400"
                  >
                    <BsFillSunFill className="w-6 h-6" target="_blank" />
                  </button>
                ) : (
                  <button
                    onClick={() => setTheme("dark")}
                    className=" leading-9 text-x1 rounded-full m-1 text-purple-600"
                  >
                    <MdDarkMode className="w-6 h-6" target="_blank" />
                  </button>
                )}
              </div>
            </div>

            <div className="top-0 right-0 p-0 md:hidden">
              <Sheet>
                <SheetTrigger>
                  <Image src={marker} alt="logo" width={75} height={75} />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>LBA-Main Website</SheetTitle>
                    <SheetTitle>Blog Home</SheetTitle>
                    <SheetTitle>About Us</SheetTitle>
                    <SheetTitle>Contact Us</SheetTitle>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
