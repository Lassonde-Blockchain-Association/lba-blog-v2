"use client";
import { getBlog } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import moment from "moment";
import Image from "next/image";
import icon from "../../components/lib/headShot.jpg";
import { Roboto_Slab } from "next/font/google";
import Link from "next/link";
import SelectedCategorySingleton from "../../components/globalSelectedCategory";

type Props = {
  params: { project: string };
};

// font import
const roboto_slab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function Blog({ params }: Props) {
  function changeCategoryTitle(category: string) {
    SelectedCategorySingleton.setSelectedCategory(category);
  }

  const slug = params.project;

  const blog = await getBlog(slug);

  return (
    <div className={roboto_slab.className}>
      {/* header section */}
      <div className="container mb-20 mx-auto py-auto md:px-10 px-4">
        <header className="mt-24">
          <div className="md:flex items-center justify-between">
            {/* left */}
            <div className="grid grid-cols-1 md:pr-4 lg:pr-0 ">
              <h1
                className="grid grid-rows-1 lg:text-6xl md:text-4xl text-4xl dropshadow font-extrabold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent "
                style={{ marginTop: "5%" }}
              >
                {blog.title}
              </h1>
              <p className="grid grid-rows-1 lg:text-2xl md:mb-0 mb-4">{blog.description}</p>
            </div>

            {/* right */}
            {/* image section */}
            <div className="flex items-center justify-center h-screen/2">
              <Image
                src={blog.image}
                alt={blog.title}
                width={800}
                height={600}
              />
            </div>
          </div>
        </header>

        {/* body */}
        <div className="md:text-lg text-gray-600 mt-5">
          {/* content */}
          <p className=" text-gray-800 dark:text-gray-400 font-bold">
            Published:{" "}
            <span className="underline">
              {moment(blog.publichedAt).format("MMM D, YYYY")}
            </span>
          </p>
          <div className="mt-5 md:flex items-start">
            <div className="lg:w-2/3 md:w-2/3 sm:text-justify dark:text-slate-400 lg:text-left sm:text sm:px-5 lg:border-r-2 lg:border-gray-500 ">
              <PortableText value={blog.content} />
            </div>
            {/* author  */}
            <div className="lg:ml-10 md:w-1/4 md:ml-5 justify-center mt-5 md:mt-[1%]">
              <p className="text-xl uppercase font-bold text-gray-900 tracking-wider dark:text-slate-500 pb-2">
                Author(s)
              </p>
              <div className="bg-gray-100 dark:bg-[#1e1e1e] m-auto rounded-lg p-2">
                <div className="flex flex-col items-center">
                  <div>
                    <Image
                      src={blog.author.image}
                      alt={blog.author.name}
                      width={80}
                      height={80}
                      className="rounded-full mb-5 mt-5"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-lg text-bold font-extralight text-black dark:text-slate-200 mb-3">
                      Author: {blog.author.name}
                    </p>
                    {/* author bio */}
                    <p className="text-sm mb-5 font-extralight text-slate-700 dark:text-slate-300">
                      {blog.author.bio}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 md:mt-3">
                <p className="text-xl uppercase font-bold text-gray-900 dark:text-slate-500 tracking-wider pb-2">
                  Categories
                </p>

                {blog.categories
                  .toString()
                  .trim()
                  .split(",")
                  .map((category) => (
                    <Link
                      key={category.toString()}
                      href={`/`}
                      onClick={() => {
                        changeCategoryTitle(category);
                      }}
                    >
                      <div className="inline-block text-sm bg-gray-100 dark:bg-[#1e1e1e] rounded-lg text-gray-500 dark:text-gray-300 py-3 px-3 font-medium whitespace-nowrap hover:bg-[#554abb] dark:hover:bg-[#2f2872] hover:text-[#ffffff] dark:hover:text-[#ffffff] transition mb-2 mr-2">
                        {category}
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}