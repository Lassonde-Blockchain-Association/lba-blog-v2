"use client";
<h1 class="grid grid-rows-1 lg:text-6xl md:text-4xl text-4xl dropshadow font-extrabold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent " style="margin-top: 5%;">AI uses GPT4 to play Minecraft</h1>
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { trpcClient } from "../../(lib)/trpc";
import Link from "next/link";

function BlogCard({ title, description, date, imageUrl, authorName, slug }) {
  return (
    <Link href={`/projects/${slug}`}>
      <img
        src={imageUrl}
        className="w-full h-44 object-fill rounded-xl"
        alt="Blog"
      />
      <h3 className="text-xl font-bold mt-4 mb-2 text-black">{title}</h3>
      <p className="text-black mb-4 font-medium text-sm dark:text-white">{description}</p>
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-5 w-5 rounded-full mr-2 dark:fill-white"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
          <span className="text-black dark:text-white text-xs">{authorName}</span>
        </div>
        <span className="text-black dark:text-white text-xs">{date}</span>
      </div>
    </Link>
  );
}

function ArticleHead({ title, description, imageUrl }) {
  return (
    <section className="article bg-gray-800 dark:bg-gray-950 text-white mt-28 p-10 md:p-20 dark:mt-0 dark:pt-36 md:dark:pt-44 relative">
      <div className="md:container mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 md:gap-12 gap-4">
          <div className='flex flex-col justify-center'>
            <div className="div-gap"></div>
            <h2 className="font-bold md:mb-14 mb-3 lg:text-6xl md:text-4xl text-lg text-white">{title}</h2>
            <ul>
              <div className="div-gap"></div>
              <h2 className="font mb-2 lg:text-md md:text-base text-sm">{description}</h2>
            </ul>
          </div>
          <div>
            <img
              src={imageUrl}
              className="w-full h-fit md:h-[450px] object-fill rounded-xl"
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
    <section className="article dark:bg-gray-950 text-black md:p-10 relative">
      <div className="md:container md:mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-10 md:p-0">
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="article-header mb-8">
              <h1 className="font-bold text-xl mb-4 dark:text-white">Published: {date}</h1>
              <hr className="border-t-2 dark:border-white" />
            </div>
            <div className="blog-content dark:text-white" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          <div className="flex items-center overflow-x-auto pt-20 pb-10 px-4">
            <span className="font-bold mr-4 text-lg dark:text-white whitespace-nowrap">Categories</span>
            <div className='flex gap-4'> 
              <Link 
                href={"/AI"}
                className="flex justify-center items-center text-center text-white bg-purple-500 w-36 h-12 hover:bg-purple-900 rounded-full whitespace-nowrap"
              >
                AI/ML
              </Link>
              <Link 
                href={"/Blockchain"}
                className="flex justify-center items-center text-center text-white bg-purple-500 w-36 h-12 hover:bg-purple-900 rounded-full whitespace-nowrap"
              >
                Blockchain
              </Link>
              <Link 
                href={"/Metaverse"}
                className="flex justify-center items-center text-center text-white bg-purple-500 w-36 h-12 hover:bg-purple-900 rounded-full whitespace-nowrap"
              >
                Metaverse
              </Link>
              <Link 
                href={"/Market"}
                className="flex justify-center items-center text-center text-white bg-purple-500 w-36 h-12 hover:bg-purple-900 rounded-full whitespace-nowrap"
              >
                Market
              </Link>
              <Link 
                href={"/Programming"}
                className="flex justify-center items-center text-center text-white bg-purple-500 w-36 h-12 hover:bg-purple-900 rounded-full whitespace-nowrap"
              >
                Programming
              </Link>
            </div>
          </div>
        </div>
        
        <div className="sidebar1 w-fit md:w-[330px]" style={{ margin: '0 auto' }}>
          <div className="font-bold text-xl text-center mb-5 dark:text-white">Author</div>
          <div className="author mb-5 p-4 bg-gray-300 dark:bg-gray-400 rounded-lg h-fit">
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
              <div className="text-xl mb-1 font-bold">{author}</div>
            </div>
          </div>
          <h2 className="dark:text-white font text-2xl text-center text-bold mb-3">Featured Blogs</h2>
          <div className="">
            <div className="featured-blog-card bg-gray-300 dark:bg-gray-900 p-6 rounded-lg">
              <div className='flex flex-col gap-8'>
                {featuredBlogs.map((blog, index) => (
                  <BlogCard
                    key={blog.id}
                    title={blog.title}
                    description={blog.description}
                    date={formatDate(blog.createdAt)}
                    imageUrl={blog.imageUrl}
                    authorName={authorNames[index]} // Pass author name for each featured blog
                    slug={blog.slug}
                  />
                ))}
              </div>
            </div>
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
        console.log(params.projectId)
        const mainBlogData = await trpcClient.blog.getBySlug.query({ slug: params.projectId });
        console.log(mainBlogData)
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
            const filteredBlogs = allBlogs.filter(blog => blog.id !== mainBlog.id);

            const mainBlogCategories = mainBlog.categories;

            const featuredBlogs = filteredBlogs.filter(blog =>
                !blog.categories.some(category => mainBlogCategories.includes(category))
            );

            const shuffledBlogs = shuffleArray(featuredBlogs);
            const randomFeaturedBlogs = shuffledBlogs.slice(0, 2);
            
            setFeaturedBlogs(randomFeaturedBlogs);

            const authorIdFeatured = randomFeaturedBlogs.map(blog => blog.authorId);
            const authorPromises = authorIdFeatured.map(authorId => trpcClient.author.getAuthorById.query({ id: authorId }));
            const allAuthors = await Promise.all(authorPromises);

            const allAuthorsName = randomFeaturedBlogs.map(blog => {
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

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

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
