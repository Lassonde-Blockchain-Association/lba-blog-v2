import React, { useEffect } from "react";
import { getCategories } from "@/sanity/sanity-utils";
import Link from "next/link";
import { Category } from "@/types/Category";

type Props = {
  updateSelectedCategory: (newValue: string) => void;
};

var categories: Category[] = [];

export default function CategoryTab({ updateSelectedCategory }: Props) {
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        categories = await getCategories();
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleButtonClick = (
    updateSelectedCategory: (newValue: string) => void,
    newValue: string
  ) => {
    updateSelectedCategory(newValue);
  };

  return (
    <div className="mt-5">
      <div className="flex flex-row sm:no-scrollbar h-auto overflow-x-auto min-h-[50px]">
        {/* older rounded gray button css */}
        {/* <div className="mr-3 rounded-lg bg-gray-300 text-md font-medium text-center text-gray-800"> */}
        <div className="mr-3">
          <button
            // older button css
            // className="inline-block px-3 py-2 rounded-lg hover:text-black hover:bg-gray-400 "
            className="relative inline-block px-4 py-2 font-medium group"
            onClick={() => {
              handleButtonClick(updateSelectedCategory, "");
            }}
          ><span className="absolute group inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black dark:bg-white group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute group inset-0 w-full h-full bg-white dark:bg-[#1e1e1e] border-2 border-black dark:border-white group-hover:bg-black dark:group-hover:bg-[#dedede]"></span>
            <span className="relative text-black dark:text-white  group-hover:text-white dark:group-hover:text-black">
              All
            </span>
          </button>
        </div>

        {/* display info from each blog */}
        {categories.map((category) => (
          <div
            key={category.title}
            // older rounded gray button css
            // className="mr-3 rounded-lg bg-gray-300 text-md font-medium text-center text-gray-800"
            className="mr-3"
          >
            <button
              // className="inline-block px-4 py-3 rounded-lg hover:text-black hover:bg-gray-400"
              className="relative inline-block px-4 py-2 font-medium group"
              onClick={() => {
                handleButtonClick(updateSelectedCategory, category.title);
              }}
            ><span className="absolute group inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black dark:bg-white group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute group inset-0 w-full h-full bg-white dark:bg-[#1e1e1e] border-2 border-black dark:border-white group-hover:bg-black dark:group-hover:bg-[#dedede]"></span>
              <span className="relative text-black dark:text-white  group-hover:text-white dark:group-hover:text-black">
                {category.title}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
