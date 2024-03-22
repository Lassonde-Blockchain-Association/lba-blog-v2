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

export default function Home() {
  //get props and paths the blog and map the data to the page

  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState(
    SelectedCategorySingleton.getSelectedCategory()
  );
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const updateSelectedCategory = (newValue: string) => {
    if (selectedCategoryTitle === newValue) {
      setSelectedCategoryTitle("");
      SelectedCategorySingleton.setSelectedCategory("");
    } else {
      setSelectedCategoryTitle(newValue);
      SelectedCategorySingleton.setSelectedCategory(newValue);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (selectedCategoryTitle === "") {
          var blogVal = await getBlogs();
          setBlogs(blogVal);
        } else if (selectedCategoryTitle === "AI/ML") {
          var blogVal = await getFilterAIBlogs();
          setBlogs(blogVal);
        } else if (selectedCategoryTitle === "Blockchain") {
          var blogVal = await getFilterBlockchainBlogs();
          setBlogs(blogVal);
        } else if (selectedCategoryTitle === "Mateverse") {
          var blogVal = await getFilterBlockchainBlogs();
          setBlogs(blogVal);
        } else if (selectedCategoryTitle === "Market") {
          var blogVal = await getFilterMarketBlogs();
          setBlogs(blogVal);
        } else {
          var blogVal = await getFilterMetaverseBlogs();
          setBlogs(blogVal);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [selectedCategoryTitle]);

  return (
    <>
        <div className="container mx-auto sm:px-4 top-20 box-border">
          <div className="mt-20 my-6 lg:mx-10 md:mx-10">
            {/* header section */}

            {/* replace this section with header component  */}

            {/* <h2 className="my-6 font-bold text-gray-700 text-5xl mt-10 ">Blogs.</h2> */}
            <h2 className="font-bold text-8xl text-gray-800 dark:text-blue-50">
              Blogs.
            </h2>

            <div className="flex justify-between items-center overflow-auto">
              <CategoryTab updateSelectedCategory={updateSelectedCategory} />
              <Link href="/submit-form">
                <button className="mt-4 bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Go to Submit Form
                </button>
              </Link>
            </div>

            {/* blog box section*/}
            <div className="flex w-full justify-center items-center mb-20">
              <div className="col container max-w-full">
                {/* display info from each blog */}
                <TrendingBlogs
                  inputBlogs={blogs}
                  postsPerPage={3}
                  selectedCategoryTitle={selectedCategoryTitle}
                />
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
