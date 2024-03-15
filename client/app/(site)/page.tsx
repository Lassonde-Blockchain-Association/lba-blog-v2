"use client";
import {
  getBlogs,
  getFilterAIBlogs,
  getFilterMetaverseBlogs,
  getFilterBlockchainBlogs,
  getFilterMarketBlogs,
  getFilteredBlogs,
} from "@/sanity/sanity-utils";
import FeaturedSidebar from "./components/FeaturedSidebar";
import CategoryTab from "./components/CategoryTab";
import TrendingBlogs from "./components/TrendingBlogs";
import { useEffect, useState, createContext, useContext } from "react";
import React from "react";
import { Blog } from "@/types/Blog";
import { ThemeProvider } from "next-themes";
import SelectedCategorySingleton from "./components/globalSelectedCategory";
import Link from "next/link";
import { date } from "zod";
import { title } from "process";

export default function Home() {

  const cardData = [
    {
      title: "Lorem Ipsum 1",
      content: "Lorem ipsum. Repellendus quidem officiis, nihil animi dicta hic accusamus ipsa, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, placeat aspernatur minus magnam unde nobis cum suscipit modi repudiandae iusto non labore autem enim quod debitis deleniti est eos nulla!",
      author: "Author 1"
    },
    {
      title: "Lorem Ipsum 2",
      content: "Lorem ipsum. Repellendus quidem officiis, nihil animi dicta hic accusamus ipsa, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, placeat aspernatur minus magnam unde nobis cum suscipit modi repudiandae iusto non labore autem enim quod debitis deleniti est eos nulla!",
      author: "Author 2"
    },
    {
      title: "Lorem Ipsum 3",
      content: "Lorem ipsum. Repellendus quidem officiis, nihil animi dicta hic accusamus ipsa, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, placeat aspernatur minus magnam unde nobis cum suscipit modi repudiandae iusto non labore autem enim quod debitis deleniti est eos nulla!",
      author: "Author 3"
    }
  ];

  const categoriesData = [
    {
      type: "AI/ML, Blockchain",
      title: "Title of the article goes here, to give an idea of what is going on.",
      author: "Author Name",

    },
    {
      type: "AI/ML",
      title: "Title of the article goes here, to give an idea of what is going on.",
      author: "Author Name",
    },
    {
      type: "AI/ML, Metaverse",
      title: "Title of the article goes here, to give an idea of what is going on.",
      author: "Author Name",
    }
  ];

  const Card = ({ title, content, author }: { title: string; content: string; author: string; }) => {
    return (
      <div className="flex gap-6 h-full">
        <div className="bg-gray-300 w-[35%] h-full rounded-xl md:rounded-none"></div>
        <div className="flex flex-col w-[65%]">
          <h1 className="text-2xl text-normal mb-2">{title}</h1>
          <p className="text-xs mb-3">{content}</p>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center">
              <div className="p-3 rounded-full bg-gray-300"></div>
              <p className="text-xs ml-3">{author}</p>
            </div>
            <div className="grid md:grid-cols-2 md:gap-x-2 items-center">
              <div className="hidden md:block p-2.5 rounded-3xl bg-gray-300 w-16"></div>
              <div className="hidden md:block p-2.5 rounded-3xl bg-gray-300 w-16"></div>
              <p className="block md:hidden text-xs ml-3">Date</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const Categories = ({ type, title, author }: { type: string; title: string; author: string; }) => {
    return (
      <div className="flex gap-6 h-full">
        <div className="bg-gray-300 flex-col w-[20%]  h-full"></div>
          <div className="flex justify-between flex-col w-[50%] l-[50%]">
          <h4 className="text-2m text-normal mb-2">{type}</h4>
          <p className="text-2xl mb-3">{title}</p>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center">
                <div className="p-3 rounded-full bg-gray-300"></div>
                  <p className="text-xs ml-3">{author}</p>
                </div>
              <div className="grid grid-cols-2 gap-x-2 items-center">
            </div>
          </div>
        </div>
       </div>
    )
  }

  return (
    <>
       <div>
        <div className="mt-24 md:mt-20 my-6 md:mx-14">
          <h2 className="font-medium text-5xl text-center text-gray-800 dark:text-blue-50 md:mb-9">
            LBA - Blog
          </h2>

          <div className="grid grid-rows-2 md:grid-cols-5 md:grid-rows-none gap-y-24 md:gap-x-24 p-8 md:p-0">
            <div className="md:col-span-3">
              <div className="flex flex-col">
                <div className="w-full h-80 bg-gray-300 mb-8 rounded-xl md:rounded-none"></div>

                <h1 className="text-4xl font-normal mb-5">Lorem Ipsum</h1>

                <p className="mb-8">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus quidem officiis, nihil animi dicta hic accusamus ipsa, tempora et reprehenderit omnis numquam sunt cupiditate mollitia! Autem praesentium tenetur quo soluta? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, placeat aspernatur minus magnam unde nobis cum suscipit modi repudiandae iusto non labore autem enim quod debitis deleniti est eos nulla!</p>
              
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center">
                    <div className="p-5 rounded-full bg-gray-300"></div>
                    <p className="ml-4 text-sm w-fit">Author</p>
                    <p className="ml-5 md:ml-16 text-sm">Date</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 md:gap-x-7 items-center">
                    <div className="p-3 md:p-5 rounded-3xl bg-gray-300 w-16 md:w-32"></div>
                    <div className="p-3 md:p-5 rounded-3xl bg-gray-300 w-16 md:w-32"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <div className="grid grid-rows-3 gap-12">
                {cardData.map((data, index) => (
                  <Card key={index} title={data.title} content={data.content} author={data.author} />
                ))}
              </div>
            </div>
          </div>
            <h2 className="flex font-bold text-5xl justify-left text-gray-800 dark:text-blue-50 mb-20 mt-20">
              Categories
            </h2>
            </div>
            
            <div className="flex grid grid-rows-1 md:grid-cols-3 md:grid-rows-none gap-y-20 md:gap-x-24 p-8 md:p-0">
              <div>
              <div className="grid gap-y-5">
                <div className="flex justify-left ml-10">
                  <button className="p-3 rounded-3xl bg-purple-500 w-40 h-12 border border-white border-2 hover:bg-purple-900 ">
                  AI/ML
                  </button>
                </div>
                <div className="flex justify-left ml-10">
                  <button className="p-3 rounded-3xl bg-purple-500 w-40 h-15 border border-white border-2 hover:bg-purple-900">
                  Blockchain
                  </button>
                </div>
                <div className="flex justify-left ml-10">
                  <button className="p-3 rounded-3xl bg-purple-500 w-40 h-12 border border-white border-2 hover:bg-purple-900">
                  Metaverse
                  </button>
                </div>
                </div>
              </div>
              <div className="col-span-2">
              <div className="grid grid-rows-3 gap-12">
                {categoriesData.map((data, index) => (
                  <Categories key={index} type={data.type} title={data.title} author={data.author} />
                ))}
              </div>
            </div>
            </div>
            </div>
          <div className="flex justify-center mt-20 mb-20">
            <Link href="https://gemini.google.com/app/c448bf0b46f4ddac">
              <button className="p-3 rounded-3xl bg-purple-500 w-32 h-12 border border-white border-2 hover:bg-purple-900 light:border-black">
              Read more
              </button>
            </Link>
        </div>
    </>
  );
}
