"use client";

interface SmallBlogProps {
  title?: string;
  date?: string;
  author?: string;
  imgSrc?: string;
  description?: string;
}

const defaultContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim \
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea \
commodo consequat. Duis aute irure dolor in reprehenderit in voluptate \
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint \
occaecat cupidatat non proident, sunt in culpa qui officia deserunt \
mollit anim id est laborum.";

export default function SmallBlogCard({
  title = "Title of Article Goes Here",
  date = "Date Goes Here",
  author = "Author Goes Here",
  imgSrc = "/growtika-nGoCBxiaRO0-unsplash.jpg",
  description = defaultContent,
}: SmallBlogProps) {
  return (
    <div className="flex flex-col w-fit md:w-96 my-2">
      <img src={imgSrc} className="aspect-video rounded-xl" />
      {/* Replace with IMG later */}
      <h1 className="mt-4 text-lg font-semibold">{title}</h1>
      <h2 className="mt-2 text-sm line-clamp-4">{description}</h2>
      <div className="flex mt-4 items-center justify-between">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6 w-6 rounded-full mr-2 dark:fill-white"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
          <h2 className="text-xs">{author}</h2>
        </div>
        <div className="flex items-center">
          <span className="mx-2 h-1 w-1 rounded-full bg-white" />
          <h2 className="text-xs">{date}</h2>
        </div>
      </div>
    </div>
  );
}
