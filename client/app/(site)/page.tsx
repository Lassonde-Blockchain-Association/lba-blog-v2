"use client";

import { useEffect, useState, createContext, useContext } from "react";
import React from "react";
import Link from "next/link";
import { trpcClient } from "./(lib)/trpc";


export default function Home() {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [usedBlogIds, setUsedBlogIds] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const allBlogs = await trpcClient.blog.getBlogs.query();
        console.log("All Blogs:", allBlogs);
        
        const sortedBlogs = allBlogs
          .sort((a, b) => b.createdAt - a.createdAt) // Sort blogs from latest to oldest
          .slice(0, 4); // Take only the first 4 blogs
        setLatestBlogs(sortedBlogs);

        setRandomBlogs(allBlogs);

        const usedIds = sortedBlogs.slice(0, 4).map(blog => blog.id);
        setUsedBlogIds(usedIds);

      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    // Set filtered blogs based on selected category
    if (selectedCategory === "") {
      // If no category selected, show default blogs
      const defaultBlogs = getDefaultBlogs();
      setFilteredBlogs(defaultBlogs);
    } else {
      // If category selected, show blogs for that category
      const blogsForCategory = latestBlogs
        .filter(blog => blog.categories.includes(selectedCategory))
        .filter(blog => !usedBlogIds.includes(blog.id))
        .slice(0, 2);
      setFilteredBlogs(blogsForCategory);
    }
  }, [selectedCategory, latestBlogs, usedBlogIds]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Function to get default blogs for each category
  const getDefaultBlogs = () => {
    const defaultBlogs = {
      "AI": [],
      "Blockchain": [],
      "Metaverse": []
    };
  
    latestBlogs.forEach(blog => {
      blog.categories.forEach(category => {
        if (defaultBlogs[category] && defaultBlogs[category].length < 3 && !usedBlogIds.includes(blog.id)) {
          defaultBlogs[category].push(blog);
        }
      });
    });
  
    // Ensure only three blogs are selected per category
    for (const category in defaultBlogs) {
      defaultBlogs[category] = defaultBlogs[category].slice(0, 3);
    }
  
    return defaultBlogs[selectedCategory] || [];
  };
  
  // Function to filter blogs by category, case-insensitive
  const filterBlogsByCategory = (category) => {
    const lowercaseCategory = category.toLowerCase();
    const filtered = latestBlogs.filter(blog =>
      blog.categories.some(cat => cat.toLowerCase() === lowercaseCategory)
    );
    return filtered;
  };
  
  useEffect(() => {
    if (selectedCategory === "") {
      // If no category selected, show default blogs
      const defaultBlogs = getDefaultBlogs();
      setFilteredBlogs(defaultBlogs);
    } else {
      // If category selected, show blogs for that category (case-insensitive)
      const blogsForCategory = filterBlogsByCategory(selectedCategory);
      setFilteredBlogs(blogsForCategory);
    }
  }, [selectedCategory, latestBlogs, usedBlogIds]);

  const CardMain = ({ imageUrl, title, description, authorId }) => {
    return (
      <div className="flex flex-col">
                <div><img src = {imageUrl} className="w-auto h-80 mb-8 rounded-xl md:rounded-none"/></div>

                <h1 className="text-4xl font-normal mb-5">{title}</h1>

                <p className="mb-8">{description}</p>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center">
                    <div className="p-5 rounded-full bg-gray-300"></div>
                    <p className="ml-4 text-sm w-fit">{authorId}</p>
                    <p className="ml-5 md:ml-16 text-sm">Date</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 md:gap-x-7 items-center">
                    <div className="p-3 md:p-5 rounded-3xl bg-gray-300 w-16 md:w-32"></div>
                    <div className="p-3 md:p-5 rounded-3xl bg-gray-300 w-16 md:w-32"></div>
                  </div>
                </div>
              </div>
    );
  };

  const CardSide = ({ imageUrl ,title, description, authorId }) => {
    return (
      <div className="flex gap-6 h-[40%]">
        <div><img src = {imageUrl} className="w-full h-40 rounded-xl md:rounded-none"/></div>
        <div className="flex flex-col w-[55%]">
          <h2 className="text-2xl text-normal mb-2">{title}</h2>
          <p className="text-xs mb-3">{description}</p>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center">
              <div className="p-3 rounded-full bg-gray-300"></div>
              <p className="text-xs ml-3">{authorId}</p>
            </div>
            <div className="grid md:grid-cols-2 md:gap-x-2 items-center">
              <div className="hidden md:block p-2.5 rounded-3xl bg-gray-300 w-16"></div>
              <div className="hidden md:block p-2.5 rounded-3xl bg-gray-300 w-16"></div>
              <p className="block md:hidden text-xs ml-3">Date</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Categories = ({ imageUrl,category, title, authorId })=> {
    return (
      <div className="flex gap-5 h-full">
        <img src = {imageUrl} className="flex-col w-[30%]  h-full"/>
          <div className="flex justify-between flex-col w-[50%] l-[50%]">
          <h4 className="text-2m text-normal mb-2">{category}</h4>
          <p className="text-2xl mb-3">{title}</p>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center">
                <div className="p-3 rounded-full bg-gray-300"></div>
                  <p className="text-xs ml-3">{authorId}</p>
                </div>
              <div className="grid grid-cols-2 gap-x-2 items-center">
            </div>
          </div>
        </div>
       </div>
    )
  }
 
  // const getRandomBlogs = () => {
  //   // Shuffle all blogs
  //   const shuffledBlogs = [...latestBlogs].sort(() => Math.random() - 0.5);
  //   // Exclude blogs that have been used in the main page
  //   const availableBlogs = shuffledBlogs.filter(blog => !usedBlogIds.includes(blog.id));
  //   // Take any 3 blogs from the shuffled array
  //   const randomBlogs = availableBlogs.slice(0, 3);
  //   return randomBlogs;
  // };

  // const handleCategoryClick = (category) => {
  //   setSelectedCategory(category);
  // };

  // const getRandomBlogsByCategory = (category) => {
  //   let filteredBlogs = [];
  //   if (category !== "") {
  //     // Filter blogs by the selected category
  //     filteredBlogs = latestBlogs.filter(blog => blog.categories.includes(category));
  //     // Exclude blogs that have been used in the main page
  //     filteredBlogs = filteredBlogs.filter(blog => !usedBlogIds.includes(blog.id));
  //     // Shuffle the filtered blogs
  //     filteredBlogs.sort(() => Math.random() - 0.5);
  //     // Take any 3 blogs from the shuffled array
  //     filteredBlogs = filteredBlogs.slice(0, 3);
  //   }
  //   return filteredBlogs;
  // };

  // useEffect(() => {
  //   if (selectedCategory === "") {
  //     // If no category selected, fetch random blogs
  //     const randomBlogs = getRandomBlogs();
  //     setFilteredBlogs(randomBlogs);
  //   } else {
  //     // If category selected, fetch random blogs for that category
  //     const randomBlogs = getRandomBlogsByCategory(selectedCategory);
  //     setFilteredBlogs(randomBlogs);
  //   }
  // }, [selectedCategory]);

 // Render null if latestBlogs is empty or undefined
 if (!latestBlogs || latestBlogs.length === 0) {
  return null;
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
              <CardMain
                imageUrl={latestBlogs[0].imageUrl}
                title={latestBlogs[0].title}
                description={latestBlogs[0].description}
                authorId={latestBlogs[0].authorId}
              />
            </div>

            <div className="col-span-2">
              <div className="grid grid-rows-3 gap-12">
                {latestBlogs.slice(1).map((data, index) => (
                  <CardSide
                    key={index}
                    imageUrl={data.imageUrl}
                    title={data.title}
                    description={data.description}
                    authorId={data.authorId}
                  />
                ))}
              </div>
            </div>
          </div>

          <h2 className="flex font-bold text-5xl justify-left-10 text-gray-800 dark:text-blue-50 mb-20 mt-20">
            Categories
          </h2>
        </div>
        <div className="grid grid-rows-1 md:grid-cols-3 md:grid-rows-none gap-y-20 md:gap-x-24 p-8 md:p-0">
          <div>
            <div className="grid gap-y-5">
              <div className="flex justify-left ml-10">
                <div
                  onClick={() => handleCategoryClick("AI")} className="p-3 text-center rounded-3xl bg-purple-500 w-40 h-12  border-black dark:border-white border-2 hover:bg-purple-900 ">
                  AI/ML
                </div>
              </div>
              <div className="flex justify-left ml-10">
                <div
                  onClick={() => handleCategoryClick("Blockchain")} className="p-3 text-center rounded-3xl bg-purple-500 w-40 h-15  border-black dark:border-white border-2 hover:bg-purple-900">
                  Blockchain
                </div>
              </div>
              <div className="flex justify-left ml-10">
              <div
                  onClick={() => handleCategoryClick("Metaverse")} className="p-3 text-center rounded-3xl bg-purple-500 w-40 h-15  border-black dark:border-white border-2 hover:bg-purple-900">
                  Metaverse
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="grid grid-rows-2 gap-12">
            {filteredBlogs && filteredBlogs.map((data, index) => (
                <Categories
                  key={index}
                  imageUrl={data.imageUrl}
                  category={data.categories.join(", ")}
                  title={data.title}
                  authorId={data.authorId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-20 mb-20">
        <Link
          href="/category"
          className="p-3 text-center rounded-3xl bg-purple-500 w-32 h-12 border-2 dark:border-white border-black hover:bg-purple-900 "
        >
          Read more
        </Link>
      </div>
    </>
  );
}
