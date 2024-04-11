"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoCallSharp } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillInstagram, AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";

function Footer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-9 py-8 px-4 md:px-14 bg-blue-50 dark:bg-slate-700"> 
      <div className="flex-none mr-10 col-span-2 md:col-span-1 md:row-start-1 md:row-end-3">
        <h1 className="font-bold">LBA</h1>
      </div>
      <div className="flex-none mr-10 col-span-5 md:col-span-3">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="font-bold mb-6 col-span-3">About</h1>
            <div>
              <p className="mt-3">Blog</p>
              <p className="mt-3">Main Website</p>
              <p className="mt-3">UI/UX Design</p>
            </div>
          </div>
          <div className="md:mr-20 col-span-2">
            <h1 className="font-bold mb-6">Pages</h1>
            <div>
              <p className="mt-3">NFT</p>
              <p className="mt-3">Team</p>
              <p className="mt-3">Blog</p>
              <p className="mt-3">Demo</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-none md:ml-20 col-span-2 md:col-span-4">
        <h1 className="font-bold mb-6">Contact</h1>
        <div>
          <p className="mt-3"><IoCallSharp className="w-fit h-fit inline-block mr-2" target="_blank"/>(406) 555-0120</p>
          <Link href="mailto:lassondeblockchain@contact.com">
          <p className="mt-3"><MdEmail className="w-fit h-fit inline-block mr-2" target="_blank" />Email Us</p>
          </Link>
          <Link href="https://goo.gl/maps/p4cjTFxrPgbEqGKh7"> 
          <p className="mt-3"><FaMapMarkerAlt className="w-fit h-fit inline-block mr-2" target="_blank"/>York University, Toronto, Canada</p>
          </Link>
        </div>
      </div>
      <div className="flex-none mr100 col-span-2 md:col-span-1">
        <h1 className="font-bold mb-6">Social Media</h1>
        <div>
        <Link href="https://www.instagram.com/lassondeblockchain/"> 
        <p className="mt-3"><AiFillInstagram className="w-fit h-fit inline-block mr-2" target="_blank"/>Instagram</p>
        </Link>
        <Link href="https://twitter.com/lassondeLBA"> 
        <p className="mt-3"><AiOutlineTwitter className="w-fit h-fit inline-block mr-2" target="_blank"/>Twitter</p>
        </Link>
        <Link href="https://www.linkedin.com/company/lassonde-blockchain-association"> 
        <p className="mt-3"><AiFillLinkedin className="w-fit h-fit inline-block mr-2" target="_blank"/>LinkedIn</p>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
