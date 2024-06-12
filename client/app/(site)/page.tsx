"use client";

import { useEffect, useState, createContext, useContext } from "react";
import React from "react";
import Link from "next/link";
import { trpcClient } from "./(lib)/trpc";

interface BlogProps {
  imageUrl: string;
  title: string;
  description: string;
  authorId: string;
  createdAt: string;
  categories: string[];
  slug: string;
}

interface BlogId {
  id: string;
}

interface CategoryProps {
  imageUrl: string;
  category: string;
  title: string;
  authorId: string;
  slug: string;
}

interface Author {
  id: string;
  firstName: string;
  lastName: string;
}

export default function Home() {

  const [allTheBlogs, setAllBlogs] = useState<BlogProps[]>([]);
  const [latestBlogs, setLatestBlogs] = useState<BlogProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [usedBlogIds, setUsedBlogIds] = useState<string[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogProps[]>([]);
  const [allAuthors, setAllAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const allBlogs = await trpcClient.blog.getBlogs.query();
        console.log("All Blogs:", allBlogs);

        setAllBlogs(allBlogs)

        const fetchAuthor = async () => {
          const authorId : string[] = allBlogs.map((blog: BlogProps) => blog.authorId);
        
          const authorPromises = authorId.map(authorId => {
            return trpcClient.author.getAuthorById.query({ id: authorId });
        });

          const allAuthors = await Promise.all(authorPromises);

          console.log("All Authors:", allAuthors);

          setAllAuthors(allAuthors);
        };
        fetchAuthor();
  
        const sortedBlogs = allBlogs
        .sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        })
        .slice(0, 4);

          setLatestBlogs(sortedBlogs);
          console.log(sortedBlogs)
  
          const usedIds = sortedBlogs.map((blog: BlogId) => blog.id);
        setUsedBlogIds(usedIds);
  
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []); // Empty dependency array ensures this effect runs only once, on mount

  useEffect(() => {
    
    // If category selected, show blogs for that category
    const blogsForCategory = latestBlogs
      .filter(blog => blog.categories.includes(selectedCategory))
      .filter(blog => !usedBlogIds.includes(blog.id))
      .slice(0, 2);
    setFilteredBlogs(blogsForCategory);
  }, [selectedCategory, latestBlogs, usedBlogIds]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Function to filter blogs by category, case-insensitive
  const filterBlogsByCategory = (category, maxBlogs = 3) => {
    const lowercaseCategory = category.toLowerCase();
    const filtered = allTheBlogs.filter(blog =>
      blog.categories.some(cat => cat.toLowerCase() === lowercaseCategory)
    ).slice(0, maxBlogs);
    return filtered;
};
  
  useEffect(() => {
      const blogsForCategory = filterBlogsByCategory(selectedCategory);
      setFilteredBlogs(blogsForCategory);
  }, [selectedCategory, latestBlogs, usedBlogIds]);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  const CardMain: React.FC<BlogProps> = ({ imageUrl, title, description, authorId, createdAt, categories, slug }) => {
    const author = allAuthors.find(author => author.id === authorId);
    const authorName = author ? `${author.firstName} ${author.lastName}` : "Unknown Author";
  
    return (
      <div className="flex flex-col">
        <Link href={`/projects/${slug}`} className="cursor-pointer">
          <div>
            <img src={imageUrl} className="w-full h-96 mb-8 rounded-xl object-fill" />
          </div>
  
          <h1 className="text-4xl font-semibold mb-5">{title}</h1>
  
          <p className="mb-8">{description}</p>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6 w-6 rounded-full mr-2 dark:fill-white">
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
              </svg>
              <p className="md:ml-1 text-xs md:text-sm w-fit">{authorName}</p>
            </div>
            <div className="flex flex-row items-center">
              <p className="text-xs md:text-sm">{createdAt}</p>
            </div>
            <div className="flex gap-1.5 md:gap-x-3 items-center">
              {categories.slice(0, 2).map((category, index) => (
                <Link 
                  href={`/${category}`}
                  key={index} className="text-center p-2 md:p-3 rounded-full text-white bg-purple-500 dark:border-white hover:bg-purple-900 w-fit md:w-36 text-xs md:text-base"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </Link>
      </div>
    );
  };
  
  const CardSide: React.FC<BlogProps> = ({ imageUrl, title, description, authorId, createdAt, categories, slug }) => {
    const author = allAuthors.find(author => author.id === authorId);
    const authorName = author ? `${author.firstName} ${author.lastName}` : "Unknown Author";
  
    return (
      <Link href={`/projects/${slug}`}>
        <div className="flex gap-6">
            <div className="w-[45%]">
              <img src = {imageUrl} className="w-full h-36 md:h-44 rounded-xl object-fill"/>
            </div>
            <div className="flex flex-col justify-center w-[55%]">
              <h2 className="text-xl md:text-2xl leading-tight mb-4 md:mb-2 font-semibold">{title}</h2>
              <p className="text-xs mb-4 md:mb-3">{description}</p>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-5 w-5 rounded-full mr-2 dark:fill-white">
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                  </svg>
                  <p className="text-xs">{authorName}</p>
                </div>
                <div className="flex md:gap-x-2">
                  {categories.slice(0, 2).map((category, index) => (
                    <Link
                      href={`/${category}`}
                      key={index} 
                      className="text-center hidden md:block p-1.5 text-xs text-white rounded-3xl w-24 bg-purple-500 dark:border-white hover:bg-purple-900"
                    >
                      {category}
                    </Link>
                  ))}
                  <div className="flex items-center">
                    <p className="block md:hidden text-xs">{createdAt}</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </Link>
    );
  };
  
  const Categories: React.FC<CategoryProps> = ({ imageUrl, category, title, authorId, slug }) => {
    const author = allAuthors.find(author => author.id === authorId);
    const authorName = author ? `${author.firstName} ${author.lastName}` : "Unknown Author";
  
    return (
      <Link href={`/projects/${slug}`}>
        <div className="flex gap-5 h-full">
          <img src = {imageUrl} className="flex-col w-[27%] h-48 object-fill rounded-xl"/>
            <div className="flex justify-between flex-col w-[50%] l-[50%]">
              <h4 className="text-2m text-normal mb-2">{category}</h4>
              <p className="text-2xl mb-3">{title}</p>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-5 w-5 rounded-full mr-2 dark:fill-white">
                      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                    </svg>
                    <p className="text-xs">{authorName}</p>
                  </div>
                <div className="grid grid-cols-2 gap-x-2 items-center">
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }  

 // Render null if latestBlogs is empty or undefined
 if (!latestBlogs || latestBlogs.length === 0) {
  return null;
}

  return (
    <>
      <div>
        <div className="mt-32 md:mt-28 my-6 md:mx-16">
          <h2 className="font-bold md:text-7xl text-5xl text-center text-gray-800 dark:text-blue-50 mb-4 md:mb-9">
            LBA - Blogs.
          </h2>

          <div className="grid grid-rows-1 md:grid-cols-7 md:grid-rows-none md:gap-x-14 md:p-0">
            <div className="md:col-span-4 p-6">
              <CardMain
                imageUrl={latestBlogs[0].imageUrl}
                title={latestBlogs[0].title}
                description={latestBlogs[0].description}
                authorId={latestBlogs[0].authorId}
                createdAt={formatDate(latestBlogs[0].createdAt)}
                categories={latestBlogs[0].categories}
                slug={latestBlogs[0].slug}
              />
            </div>

            <div className="md:col-span-3">
              <div className="grid grid-rows-3 gap-10 p-6">
                {latestBlogs.slice(1).map((data, index) => (
                  <CardSide
                    key={index}
                    imageUrl={data.imageUrl}
                    title={data.title}
                    description={data.description}
                    authorId={data.authorId}
                    createdAt={formatDate(data.createdAt)}
                    categories={data.categories}
                    slug={data.slug}
                  />
                ))}
              </div>
            </div>
          </div>

          <h2 className="flex font-bold text-5xl justify-left-10 text-gray-800 dark:text-blue-50 mb-16 mt-20">
            Categories
          </h2>
          <h2 className="text-xs italic">Click on a category to see category specific blog</h2>
        </div>
        <div className="grid grid-rows-1 md:grid-cols-3 md:grid-rows-none gap-y-20 md:gap-x-24 p-8 md:p-0">
          <div>
            <div className="grid gap-y-5 ml-28">
              <div className="flex justify-left">
                <button
                  onClick={() => handleCategoryClick("AI")} className="p-3 text-center rounded-3xl text-white bg-purple-500 w-40 h-12 hover:bg-purple-900">
                  AI/ML
                </button>
              </div>
              <div className="flex justify-left">
                <button
                  onClick={() => handleCategoryClick("Blockchain")} className="p-3 text-center rounded-3xl text-white bg-purple-500 w-40 h-12 hover:bg-purple-900">
                  Blockchain
                </button>
              </div>
              <div className="flex justify-left">
                <button
                  onClick={() => handleCategoryClick("Metaverse")} className="p-3 text-center rounded-3xl text-white bg-purple-500 w-40 h-12 hover:bg-purple-900">
                  Metaverse
                </button>
              </div>
              <div className="flex justify-left">
                <button
                  onClick={() => handleCategoryClick("Market")} className="p-3 text-center rounded-3xl text-white bg-purple-500 w-40 h-12 hover:bg-purple-900">
                  Market
                </button>
              </div>
              <div className="flex justify-left">
                <button
                  onClick={() => handleCategoryClick("Programming")} className="p-3 text-center rounded-3xl text-white bg-purple-500 w-40 h-12 hover:bg-purple-900">
                  Programming
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col gap-12">
            {filteredBlogs && filteredBlogs.map((data, index) => (
                <Categories
                  key={index}
                  imageUrl={data.imageUrl}
                  category={data.categories.join(", ")}
                  title={data.title}
                  authorId={data.authorId}
                  slug={data.slug}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-14 mt-4 md:my-20">
        <Link
          href={`/${selectedCategory}`}
          className="p-3 text-center rounded-3xl text-white bg-purple-500 w-32 h-12 hover:bg-purple-900 "
        >
          Read more
        </Link>
      </div>
    </>
  );
}