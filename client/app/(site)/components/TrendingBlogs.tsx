import { Blog } from "@/types/Blog";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";

interface TrendingBlogProps {
  inputBlogs: Blog[];
  postsPerPage: number;
  selectedCategoryTitle: string;
}

function TrendingBlogs({
  inputBlogs,
  postsPerPage,
  selectedCategoryTitle,
}: TrendingBlogProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategoryTitle]);

  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = inputBlogs.slice(indexOfFirstPost, indexOfLastPost);
    setBlogs(currentPosts);
  }, [inputBlogs, currentPage, postsPerPage, selectedCategoryTitle]);

  return (
    <>
      {blogs.map((blog) => (
        <Link href={`/projects/${blog.slug}`} key={blog.id}>
          <div className="shadow-lg rounded dark:shadow-slate-600 dark:bg-[#1e1e1e] flex flex-col md:flex-row items-center my-10 mx-3">
            <div className="group cursor-pointer overflow-hidden p-5">
              {blog.imageUrl && (
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  width={200}
                  height={200}
                  className="flex rounded h-60 w-60 object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                />
              )}
            </div>
            <div className="flex flex-col px-4">
              <p className="text-sm tracking-wider uppercase">
                Categories: {blog.category}
              </p>
              <p>{blog.description}</p>
              <p className="mt-4 md:mt-8">
                {moment(blog.createdAt).format("MMM D")}
              </p>
              <p className="text-2xl md:text-5xl font-extrabold">
                {blog.title}
              </p>
              <p className="mt-1 text-sm uppercase font-extrabold">
                {blog.description}
              </p>
              <span className="uppercase font-extralight pb-5">
                By {blog.author.firstName} {blog.author.lastName}
              </span>
            </div>
          </div>
        </Link>
      ))}
      <Pagination
        currentPage={currentPage}
        numTotalPages={Math.ceil(inputBlogs.length / postsPerPage)}
        onChangePage={setCurrentPage}
      />
    </>
  );
}

export default TrendingBlogs;
