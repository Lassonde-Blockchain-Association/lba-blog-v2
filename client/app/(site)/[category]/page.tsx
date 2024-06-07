"use client";
import React, { useState, useEffect } from "react";
import SmallBlogCard from "../components/SmallBlogCard";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import { trpcClient } from "../(lib)/trpc";
import { useParams } from 'next/navigation';

interface SmallBlog {
  id: string;
  title: string;
  createdAt: string;
  description: string;
  slug: string;
  imageUrl?: string;
}

export default function CategoryPage() {
  const blogsPerPage = 9; 
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState<SmallBlog[]>([]);
  const [allAuthors, setAllAuthors] = useState([]);
  const [allAuthorName, setAllAuthorName] = useState([]);
  const params = useParams<{ tag: string; item: string }>();
  
  useEffect(() => {
    const fetchBlog = async () => {
      const allBlogs = await trpcClient.blog.getBlogs.query();
      const aiBlogs = allBlogs.filter(blog => blog.categories.includes(params.category));
      setBlogs(aiBlogs);

    const authorId = aiBlogs.map(blog => blog.authorId);
    const authorDetails = authorId.map(authorId => trpcClient.author.getAuthorById.query({ id: authorId }));

    const allAuthors = await Promise.all(authorDetails);

    setAllAuthors(allAuthors);
    
    // Map each blog to its author's name
    const authorNames = aiBlogs.map(blog => {
      const author = allAuthors.find(author => author.id === blog.authorId);
      return author ? `${author.firstName} ${author.lastName}` : "Unknown Author";
    });
    setAllAuthorName(authorNames);
  };
  fetchBlog();
}, []);

  const currentBlogs = blogs.slice(currentPage * blogsPerPage - blogsPerPage, currentPage * blogsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const defaultCategoryTitle = (() => {
    switch (params.category) {
        case "AI":
            return "AI / Machine Learning";
        case "Metaverse":
            return "Metaverse";
        case "Blockchain":
            return "Blockchain Technology";
        case "Market":
            return "Market";
        case "Programming":
            return "Programming";
        default:
            return "Category Title";
    }
})();

  const defaultCategoryDescription = (() => {
    switch (params.category) {
        case "AI":
            return "Artificial Intelligence (AI) and Machine Learning are transforming industries by enabling computers to learn from data, recognize patterns, and make intelligent decisions. Explore the latest advancements, applications, and ethical considerations in this rapidly evolving field.";
        case "Metaverse":
            return "The Metaverse is a virtual universe where digital environments, augmented reality, and virtual reality converge, offering immersive experiences and limitless possibilities. Discover how technology is reshaping social interactions, entertainment, commerce, and beyond in this evolving digital frontier.";
        case "Blockchain":
            return "Blockchain Technology is revolutionizing the way transactions are recorded, verified, and executed in a transparent, decentralized, and secure manner. Learn about cryptocurrencies like Bitcoin, Ethereum, and the underlying blockchain technology powering them, along with smart contracts, decentralized finance (DeFi), and other disruptive applications.";
        case "Market":
            return "Stay informed about the dynamic world of financial markets, where stocks, commodities, currencies, and other assets are traded. Explore market trends, economic indicators, investment strategies, and expert analysis to make informed decisions and navigate the complexities of the global economy.";
        case "Programming":
            return "Programming is the art and science of creating software applications, websites, and digital solutions using programming languages, frameworks, and development tools. Whether you're a beginner or an experienced developer, dive into the world of coding, software engineering best practices, and the latest trends in technology.";
        default:
            return "Category Description";
    }
  })();

  return (
    <div className="">
      <div className="absolute -z-10">
        <img
          src="/growtika-nGoCBxiaRO0-unsplash.jpg"
          className="object-cover bg-gradient-to-b opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent dark:to-[hsl(222.2,84%,4.9%)] to-white"></div>
      </div>

      <div className="px-6 md:px-0 md:container h-full w-full pt-20">
        <div className="my-32 w-8/12">
          <h1 className="text-6xl font-semibold">{defaultCategoryTitle}</h1>
          <p className="m-2 mt-5 w-full sm:w-8/12">{defaultCategoryDescription}</p> 
        </div>
        <div className="grid grid-cols-1 gap-4 gap-y-16 justify-center md:grid-cols-2 lg:grid-cols-3">
          {currentBlogs.map((blog, index) => (
           <BrowserRouter key={blog.id}>
              <Blog key={index} blog={blog} index={index} authorNames={allAuthorName[index]}/>
           </BrowserRouter>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          numTotalPages={Math.ceil(blogs.length / blogsPerPage)}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
}

interface BlogProps {
  blog: SmallBlog;
  index: number;
  authorNames: string;
}

function Blog({ blog, index, authorNames }: BlogProps) {
  let blogClassName: string;
  if (index % 3 === 0) {
    blogClassName = "justify-start";
  } else if (index % 3 === 1) {
    blogClassName = "justify-center";
  } else {
    blogClassName = "justify-end";
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  return (
    <div className={`md:flex ${blogClassName}`}>
     <Link to={`/projects/${blog.slug}`} className="cursor-pointer">
        <SmallBlogCard
          imgSrc={blog.imageUrl}
          title={blog.title}
          date={formatDate(blog.createdAt)}
          author={authorNames}
          description={blog.description}
        />
      </Link>
    </div>
  );
}
