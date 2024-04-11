"use client";
import React from "react";


function ArticleHead() {
  return (
    <section className="article bg-gray-800 dark:bg-gray-950 text-white p-20 relative">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-2 gap-4">
          <div>
            <div className="div-gap"></div>
            <h2 className="font-bold mb-2 lg:text-6xl md:text-4xl">Keeping repository maintainer information accurate</h2>
            <ul>
              <div className="div-gap"></div>
              <h2 className="font mb-2 lg:text-md md:text-sm">Discover how keeping repository maintainer 
              information accurate through CODEOWNERS files and automating maintenance 
              with tools like cleanowners fosters efficient collaboration and sustainable software projects.</h2>
            </ul>
          </div>
          <div>
            <img
              src="/growtika-nGoCBxiaRO0-unsplash.jpg"
              className="object-cover bg-gradient-to-b opacity-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ArticleBody() {
  return (
    <section className="article dark:bg-gray-950 text-black p-10 relative">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main article content */}
        <div className="lg:col-span-2">
          <div className="article-header mb-8">
            <h1 className="font-bold text-xl mb-4 dark:text-white">Mar 2nd, 2024</h1>
            <hr className="border-t-2 dark:border-white" />
          </div>
          <div className="blog-content dark:text-white">
            <p>Companies and their structures are always evolving. 
            Regardless of the reason, with people and information exchanging places, 
            it’s easy for maintainership/ownership information about a repository to become outdated or unclear.
             Maintainers play a crucial role in guiding and stewarding a project, and knowing who they are is 
             essential for efficient collaboration and decision-making. This information can be stored in 
             the CODEOWNERS file but how can we ensure that it’s up to date? Let’s delve into why this matters 
             and how the GitHub OSPO’s tool, cleanowners, can help maintainers achieve accurate ownership 
             information for their projects.</p>
             <p>In any software project, having clear ownership guidelines is crucial 
              for effective collaboration. Maintainers are responsible for reviewing 
              contributions, merging changes, and guiding the project’s direction. 
              Without clear ownership information, contributors may be unsure of who to 
              reach out to for guidance or review. Imagine that you’ve discovered a high-risk 
              security vulnerability and nobody is responding to your pull request to fix it, 
              let alone coordinating that everyone across the company gets the patches needed for fixing it. 
              This ambiguity can lead to delays and confusion, unfortunately teaching teams that it’s 
              better to maintain control than to collaborate. These are not the outcomes we are hoping for 
              as developers, so it’s important for us to consider how we can ensure active maintainership 
              especially of our production components.</p>
              <p>Companies and their structures are always evolving. 
              Regardless of the reason, with people and information exchanging places, 
              it’s easy for maintainership/ownership information about a repository to become outdated or unclear.
              Maintainers play a crucial role in guiding and stewarding a project, and knowing who they are is 
              essential for efficient collaboration and decision-making. This information can be stored in 
              the CODEOWNERS file but how can we ensure that it’s up to date? Let’s delve into why this matters 
              and how the GitHub OSPO’s tool, cleanowners, can help maintainers achieve accurate ownership 
              information for their projects.</p>
              <p>In any software project, having clear ownership guidelines is crucial 
              for effective collaboration. Maintainers are responsible for reviewing 
              contributions, merging changes, and guiding the project’s direction. 
              Without clear ownership information, contributors may be unsure of who to 
              reach out to for guidance or review. Imagine that you’ve discovered a high-risk 
              security vulnerability and nobody is responding to your pull request to fix it, 
              let alone coordinating that everyone across the company gets the patches needed for fixing it. 
              This ambiguity can lead to delays and confusion, unfortunately teaching teams that it’s 
              better to maintain control than to collaborate. These are not the outcomes we are hoping for 
              as developers, so it’s important for us to consider how we can ensure active maintainership 
              especially of our production components.</p>
              <p>In any software project, having clear ownership guidelines is crucial 
              for effective collaboration. Maintainers are responsible for reviewing 
              contributions, merging changes, and guiding the project’s direction. 
              Without clear ownership information, contributors may be unsure of who to 
              reach out to for guidance or review. Imagine that you’ve discovered a high-risk 
              security vulnerability and nobody is responding to your pull request to fix it, 
              let alone coordinating that everyone across the company gets the patches needed for fixing it. 
              This ambiguity can lead to delays and confusion, unfortunately teaching teams that it’s 
              better to maintain control than to collaborate. These are not the outcomes we are hoping for 
              as developers, so it’s important for us to consider how we can ensure active maintainership 
              especially of our production components.</p>
            {/* Add more paragraphs as needed */}
          </div>
          <div className="flex items-center overflow-x-auto pt-20 pb-10 px-4 -mx-4">
            <span className="font-bold mr-4 text-lg dark:text-white whitespace-nowrap">Categories</span>
            <button className="border bg-gray-300 rounded-full py-2 px-14 mr-2 whitespace-nowrap">Button 1</button>
            <button className="border bg-gray-300 rounded-full py-2 px-14 mr-2 whitespace-nowrap">Button 2</button>
            <button className="border bg-gray-300 rounded-full py-2 px-14 whitespace-nowrap">Button 3</button>
            {/* ... add as many buttons as needed */}
          </div>
        </div>
        
        {/* Sidebar for author and featured blogs */}
        <div className="sidebar1 "style={{ width: '330px', margin: '0 auto' }}>
          <div className="font-bold text-xl text-center mb-2 dark:text-white">Author</div>
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
                <img src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.d275875e.png&amp;w=1080&amp;q=75" 
                alt="description" 
                style={{ width: '100px', height: '100px' }}
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg mb-1">Author Name</div>
              <div className="text-sm">Lorem ipsum dolor sit amet, Turpis massa tincidunt dui ut ornare lectus sit. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc.</div>
            </div>
          </div>
          <h2 className="dark:text-white font text-2xl text-center text-bold mb-3">Featured Blogs</h2>
          <div className="">
            <div className="featured-blog-card dark:bg-gray-900 p-6">
              <img
                src="/growtika-nGoCBxiaRO0-unsplash.jpg"
                className="object-cover bg-gradient-to-b opacity-100"
              />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Title of Article Goes Here</h3>
              <p className="text-gray-600 mb-4 text-sm dark:text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-white">Author Goes Here</span>
                <span className="text-gray-600 dark:text-white">Date over here</span>
              </div>
            </div>
            <div className="featured-blog-card dark:bg-gray-900 p-6">
              <img
                src="/growtika-nGoCBxiaRO0-unsplash.jpg"
                className="object-cover bg-gradient-to-b opacity-100"
              />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Title of Article Goes Here</h3>
              <p className="text-gray-600 mb-4 text-sm dark:text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-white">Author Goes Here</span>
                <span className="text-gray-600 dark:text-white">Date over here</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default function blog() {
  return (
    <>
      <ArticleHead />
      <ArticleBody />
    </>
  );
}
