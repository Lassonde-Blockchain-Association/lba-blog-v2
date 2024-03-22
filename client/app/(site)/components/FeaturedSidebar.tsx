"use client";
import { ReactNode } from "react";
// Worked on by Daniel

function FeaturedSidebar() {
  return (
    <div className="top-10 hidden md:block">
      <aside className=" sticky top-5 ">
        <div className="border-solid border-2 border-black py-2">
          <div>
            <h1 className="text-4xl font-bold text-center">FEATURED</h1>
          </div>
          <div className="m-5">
            <h1 className="text-3xl font-bold ">NEWS</h1>
            <p>something</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default FeaturedSidebar;
