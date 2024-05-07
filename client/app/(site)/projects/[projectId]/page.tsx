"use client";

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { trpcClient } from "../../(lib)/trpc";
import Link from "next/link";

function BlogCard({ title, description, date, imageUrl, authorName, blogId }) {
  return (
    <Link href={`/projects/${blogId}`}>
      <div className="featured-blog-card dark:bg-gray-900 p-6">
        <img
          src={imageUrl}
          className="w-full h-44 object-fill"
          alt="Blog"
        />
        <h3 className="text-xl font-semibold mt-4 mb-2 dark:text-white">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm dark:text-white">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex flex-row items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-5 w-5 rounded-full mr-2 dark:fill-white"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
            <span className="text-gray-600 dark:text-white text-xs">{authorName}</span>
          </div>
          <span className="text-gray-600 dark:text-white text-xs">{date}</span>
        </div>
      </div>
    </Link>
  );
}

function ArticleHead({ title, description, imageUrl }) {
  return (
    <section className="article bg-gray-800 dark:bg-gray-950 text-white mt-28 p-20 dark:mt-0 dark:pt-44 relative">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-2 gap-4">
          <div className='flex flex-col justify-center'>
            <div className="div-gap"></div>
            <h2 className="font-bold mb-2 lg:text-6xl md:text-4xl">{title}</h2>
            <ul>
              <div className="div-gap"></div>
              <h2 className="font mb-2 lg:text-md md:text-sm">{description}</h2>
            </ul>
          </div>
          <div>
            <img
              src={imageUrl}
              className="w-full h-[450px] object-fill"
              alt="Article Header"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ArticleBody({ content, author, date, featuredBlogs, authorNames }) {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  return (
    <section className="article dark:bg-gray-950 text-black p-10 relative">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="article-header mb-8">
            <h1 className="font-bold text-xl mb-4 dark:text-white">{date}</h1>
            <hr className="border-t-2 dark:border-white" />
          </div>
          <div className="blog-content dark:text-white">
            <p>{content}</p>
          </div>
          <div className="flex items-center overflow-x-auto pt-20 pb-10 px-4 -mx-4">
            <span className="font-bold mr-4 text-lg dark:text-white whitespace-nowrap">Categories</span>
            <button className="border bg-gray-300 rounded-full py-2 px-14 mr-2 whitespace-nowrap">AI</button>
            <button className="border bg-gray-300 rounded-full py-2 px-14 mr-2 whitespace-nowrap">Blockchain</button>
            <button className="border bg-gray-300 rounded-full py-2 px-14 whitespace-nowrap">Metaverse</button>
          </div>
        </div>
        
        <div className="sidebar1" style={{ width: '330px', margin: '0 auto' }}>
          <div className="font-bold text-xl text-center mb-5 dark:text-white">Author</div>
          <div className="author mb-5 p-4 bg-gray-300 dark:bg-gray-400 rounded-lg" style={{height: '300px'}}>
            <div className="flex justify-center">
              <div className="avatar-placeholder" style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: 'lightgrey',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <img
                  src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.d275875e.png&amp;w=1080&amp;q=75"
                  alt="Author Avatar"
                  style={{ width: '100px', height: '100px' }}
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg mb-1 font-bold">{author}</div>
              <div className="text-sm">Lorem ipsum dolor sit amet, Turpis massa tincidunt dui ut ornare lectus sit. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc.</div>
            </div>
          </div>
          <h2 className="dark:text-white font text-2xl text-center text-bold mb-3">Featured Blogs</h2>
          <div className="">
          {featuredBlogs.map((blog, index) => (
                <BlogCard
                  key={blog.id}
                  title={blog.title}
                  description={blog.description}
                  date={formatDate(blog.createdAt)}
                  imageUrl={blog.imageUrl}
                  authorName={authorNames[index]} // Pass author name for each featured blog
                  blogId={blog.id}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function blog() {
  const [mainBlog, setMainBlog] = useState(null);
  const [authorName, setAuthorName] = useState("");
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [allAuthorsName, setAllAuthors] = useState([]);
  const params = useParams<{ tag: string; item: string }>();

  useEffect(() => {
    const fetchMainBlog = async () => {
      try {
        const mainBlogData = await trpcClient.blog.getById.query({ id: params.projectId });
        setMainBlog(mainBlogData);

        const authorId = mainBlogData.authorId;
        const author = await trpcClient.author.getAuthorById.query({ id: authorId });
        const authorName = author ? `${author.firstName} ${author.lastName}` : "Unknown Author";
        setAuthorName(authorName);
      } catch (error) {
        console.error("Error fetching main blog data:", error);
      }
    };

    fetchMainBlog();
  }, [params.projectId]);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const allBlogs = await trpcClient.blog.getBlogs.query();
        // Filter out the current main blog
        const filteredBlogs = allBlogs.filter(blog => blog.id !== mainBlog.id);
        const featuredBlogs = filteredBlogs.filter(blog => blog.categories.some(category => mainBlog?.categories.includes(category)));
        console.log(featuredBlogs)
        setFeaturedBlogs(featuredBlogs);
    
        const authorIdFeatured = featuredBlogs.map(blog => blog.authorId);
        const authorPromises = authorIdFeatured.map(authorId => trpcClient.author.getAuthorById.query({ id: authorId }));
        const allAuthors = await Promise.all(authorPromises);
    
        const allAuthorsName = featuredBlogs.map(blog => {
          const author = allAuthors.find(author => author.id === blog.authorId);
          return author ? `${author.firstName} ${author.lastName}` : "Unknown Author";
        });

        setAllAuthors(allAuthorsName);
      } catch (error) {
        console.error("Error fetching featured blogs:", error);
      }
    };

    fetchFeaturedBlogs();
  }, [mainBlog]);

  function formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.toLocaleString('en-us', { month: 'short' });
    const day = date.getDate();
    let daySuffix = 'th';
    
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = 'st';
    } else if (day === 2 || day === 22) {
      daySuffix = 'nd';
    } else if (day === 3 || day === 23) {
      daySuffix = 'rd';
    }
    
    return `${month} ${day}${daySuffix}, ${year}`;
  }
  
  return (
    <>
      {mainBlog && (
        <>
          <ArticleHead 
            title={mainBlog.title}
            description={mainBlog.description}
            imageUrl={mainBlog.imageUrl}
          />

          <ArticleBody 
            content={mainBlog.content}
            author={authorName}
            date={formatDate(mainBlog.createdAt)}
            featuredBlogs={featuredBlogs}
            authorNames={allAuthorsName}
          />
        </>
      )}
    </>
  );
}
