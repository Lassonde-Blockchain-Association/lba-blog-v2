import React from "react";
import { getCategories } from "@/sanity/sanity-utils";
import Link from "next/link";

async function CategoryTab() {
  const categories = await getCategories();

  return (
    <div className="mt-5 flex flex-wrap justify-center lg:justify-start">
      {categories.map((category) => (
        <Link href={`/categories/${category.title}`} key={category._id}>
          <div className="m-2 rounded-lg bg-gray-100 text-md font-medium text-center text-gray-500 dark:text-gray-400">
            <div className="px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">
              {category.title}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CategoryTab;
