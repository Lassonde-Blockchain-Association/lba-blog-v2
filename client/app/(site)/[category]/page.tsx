"use client";
import React, { useState } from "react";
import SmallBlogCard from "../components/SmallBlogCard";
import Pagination from "../components/Pagination";

const defaultCategoryTitle = "AI / Machine Learning";
const defaultCategoryDescription =
  "With the rise of tools such as ChatGPT, AI and Machine Learning has \
crossed over Blockchain technology. Lorem ipsum dolor sit amet, \
consectetur adipiscing elit, sed do eiusmod tempor incididunt ut \
labore et dolore magna aliqua.";

interface SmallBlog {
  title: string;
  date: string;
  author: string;
  content: string;
}

const exampleBlog: SmallBlog = {
  title: "Title of Article Goes Here",
  date: "Date Goes Here",
  author: "Author Goes Here",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim \
  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea \
  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate \
  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint \
  occaecat cupidatat non proident, sunt in culpa qui officia deserunt \
  mollit anim id est laborum.",
};

var exampleBlogs = new Array(45);
exampleBlogs.fill(exampleBlog);

export default function CategoryPage() {
  const blogsPerPage = 9; 
  const [currentPage, setCurrentPage] = useState(1);


  const currentBlogs = exampleBlogs.slice(currentPage * blogsPerPage - blogsPerPage, currentPage * blogsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      <div className="absolute -z-10">
        <img
          src="/growtika-nGoCBxiaRO0-unsplash.jpg"
          className="object-cover bg-gradient-to-b opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent dark:to-[hsl(222.2,84%,4.9%)] to-white"></div>
      </div>

      <div className="container h-full w-full pt-20">
        <div className="my-32 w-8/12">
          <h1 className="text-6xl font-semibold">{defaultCategoryTitle}</h1>
          {/* <p className="m-2 mt-5 w-6/12">{defaultCategoryDescription}</p> */}
          <p className="m-2 mt-5 w-full sm:w-6/12">{defaultCategoryDescription}</p> 
        </div>
        {/* <div className="grid grid-cols-3 gap-4 gap-y-16 justify-center items-center"> */}
        <div className="grid grid-cols-1 gap-4 gap-y-16 justify-center items-center sm:grid-cols-2 md:grid-cols-3">
          {currentBlogs.map((blog, index) => (
            <Blog key={index} blog={blog} index={index} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          numTotalPages={Math.ceil(exampleBlogs.length / blogsPerPage)}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
}

interface BlogProps {
  blog: SmallBlog;
  index: number;
}

function Blog({ blog, index }: BlogProps) {
  let blogClassName: string;
  if (index % 3 === 0) {
    blogClassName = "justify-start";
  } else if (index % 3 === 1) {
    blogClassName = "justify-center";
  } else {
    blogClassName = "justify-end";
  }
  return (
    <div className={`flex ${blogClassName}`}>
      <SmallBlogCard
        title={blog.title}
        date={blog.date}
        author={blog.author}
        content={blog.content}
      />
    </div>
  );
}
