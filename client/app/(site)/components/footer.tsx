"use client";
import React from "react";
import Link from "next/link";
import { IoCallSharp } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillLinkedin,
} from "react-icons/ai";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import SelectedCategorySingleton from "../components/globalSelectedCategory";
import Head from "next/head";
import logo from "../../../public/logo.png";
type NewsletterPopupProps = {
  onClose: () => void;
};

function NewsletterPopup({ onClose }: NewsletterPopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="mydiv w-full md:w-2/3 lg:w-1/2 xl:w-1/3 h-2/3 md:h-1/2 lg:h-2/5 xl:h-1/3 p-4">
        <div className="bg-white grid grid-cols-2 gap-2 p-4 rounded-lg shadow-lg text-center">
          <div>
            <h2 className="text-2xl text-black p-2 font-bold mb-2">
              Welcome to LBA Blogs
            </h2>
            {/* <p className="mb-4 text-xs text-black">Your guiding light in the world of decentralization and innovation!</p> */}
            <p className="mb-1 text-sm text-black">
              We are currently working on our newsletter subscription feature.
            </p>
            <p className="mb-3 text-sm text-black">Thankyou for waiting😊</p>
            <form className="flex flex-col items-center">
              {/* <input
                type="email"
                placeholder="Enter your email address"
                className="bg-gray-200 p-2 mb-2 rounded-lg focus:outline-none"
              /> */}
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                Close
              </button>
            </form>
            <button
              onClick={onClose}
              className="absolute top-0 right-0 mt-2 mr-2"
            >
              &times;
            </button>
          </div>
          <div className="bg-gray-800">
            <img
              src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.d275875e.png&amp;w=1080&amp;q=75"
              alt="LBA Logo"
              width="250"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsletterSection() {
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  return (
    <section className="newslettersec bg-gray-300 dark:bg-gray-900 dark:text-white py-8 px-4 md:px-8 lg:px-20 dark:bg-slate-900/75">
      <div className="max-w-6xl mx-auto">
        <div
          className="dark:bg-gray-900 p-6 md:p-10 rounded-full"
          style={{
            borderImage: "linear-gradient(to left, orange, indigo) 1",
            borderWidth: "2px",
            borderStyle: "solid",
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="flex-1 items-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                <p>Welcome to LBA - Blog</p>
                <p className="text-lg">a continuous improvement</p>
              </h2>
              <p className="welcometext mb-4 text-sm">
                Don't just learn – share. Your articles can turn your profile
                into a hub for like-minded professionals, enhancing
                collaborations and knowledge exchange.
              </p>
            </div>
            <div className="flex-1">
              {/* <div className="flex flex-row justify-center items-end rounded-l"> */}
              <div className="flex justify-center mb-7">
                <form>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="bg-white w-[50%] items-right p-2 text-black flex-1 rounded-l-lg"
                    style={{ minWidth: "200px" }}
                  />
                  <button
                    type="button"
                    onClick={handleButtonClick}
                    className="bg-white text-orange-700 hover:text-orange-600 font-bold py-2 px-4 rounded-r-lg transition-colors duration-300"
                  >
                    Join Us {">"}
                  </button>
                </form>
              </div>
              <div className="flex justify-center">
                <p className="text-xs text-center">
                  Share your journey through engaging articles and videos that
                  capture your discoveries, experiences, and insights within
                  this vibrant community, fostering a cycle of perpetual growth
                  and learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup && <NewsletterPopup onClose={() => setShowPopup(false)} />}
    </section>
  );
}

function Footer() {
  return (
    <footer className="LBAfooter bg-gray-800 dark:bg-gray-950 text-white md:p-14 relative">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 py-5 pb-0 md:py-0">
        <Link href="https://lassondeblockchain.vercel.app/">
          <div className="md:col-span-1">
            <h1 className="font-bold text-2xl">
              <img
                src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.d275875e.png&amp;w=1080&amp;q=75"
                alt="LBA Logo"
                width="80"
              ></img>
            </h1>
            <ul>
              <li className="mt-1">
                <div>Lassonde</div>
                <div>Blockchain Association</div>
              </li>
            </ul>
          </div>
        </Link>

        <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 md:gap-4">
          <div>
            <h2 className="font-bold mb-3.5 text-xl">About</h2>
            <ul>
              <li className="mb-2">
                <Link href="#">Blog</Link>
              </li>
              <li className="mb-2">
                <Link href="#">Main Website</Link>
              </li>
              <li>
                <Link href="#">UI/UX Design</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-3.5 text-xl">Pages</h2>
            <ul>
              <li className="mb-2">
                <Link href="#">NFT</Link>
              </li>
              <li className="mb-2">
                <Link href="#">Team</Link>
              </li>
              <li className="mb-2">
                <Link href="#">Blog</Link>
              </li>
              <li>
                <Link href="#">Demo</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-3.5 text-xl">Contact</h2>
            <ul>
              <li className="mb-2">
                <IoCallSharp className="w-fit h-fit inline-block mr-2" />
                <a href="tel:(406) 555-0120">(406) 555-0120</a>
              </li>
              <li className="mb-2">
                <MdEmail className="w-fit h-fit inline-block mr-2" />
                <Link href="mailto:lassondeblockchain@contact.com">
                  Email Us
                </Link>
              </li>
              <li>
                <FaMapMarkerAlt className="w-fit h-fit inline-block mr-2" />
                <Link href="https://goo.gl/maps/p4cjTFxrPgbEqGKh7">
                  York University, Toronto, Canada
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="px-8 pb-6 md:px-0 md:pb-0">
        <hr className="dark:border-white mt-7 md:mt-8"/>
        <div className="social-icons mt-7 md:mt-8 flex justify-center">
          <Link href="https://www.instagram.com/lassondeblockchain/">
            <AiFillInstagram className="w-fit h-fit inline-block mx-2 text-4xl" />
          </Link>
          <Link href="https://twitter.com/lassondeLBA">
            <AiOutlineTwitter className="w-fit h-fit inline-block mx-2 text-4xl" />
          </Link>
          <Link href="https://www.linkedin.com/company/lassonde-blockchain-association">
            <AiFillLinkedin className="w-fit h-fit inline-block mx-2 text-4xl" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <NewsletterSection />
      <Footer />
    </>
  );
}
