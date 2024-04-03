"use client";
import React, { FC, useEffect, useState } from "react";
import TextEditor from "@/app/(site)/submit-form/components/TextEditor";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import NextLink from "next/link";

import processSubmitBlog from "./components/ProcessSubmitBlog";
import FileDragDrop from "./components/FileDragDrop";
import DateCategorySection from "./components/DateCategorySection";

import { trpcClient } from "../(lib)/trpc";

function MyForm() {
  const [file, setFile] = useState<File>();
  const [imageSrc, setImageSrc] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [categoryError, SetCategoryError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [shouldMsgShow, setShouldMsgShow] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      Link.extend({ inclusive: false }).configure({
        openOnClick: false,
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
  });

  const [formData, setFormData] = useState<{
    title: string;
    slug: string;
    description: string;
    author: string;
    category: string[];
    date: string;
  }>({
    title: "",
    slug: "",
    description: "",
    author: "",
    category: [],
    date: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    // Update the slug when the title changes
    if (name === "title") {
      const slug = generateSlug(value);
      setFormData({ ...formData, [name]: value, slug });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCategoryInputChange = (value: string) => {
    const name = "category";

    var categoriesCopy = formData.category;
    if (formData.category.includes(value)) {
      var index = categoriesCopy.indexOf(value);
      categoriesCopy.splice(index, 1);
    } else {
      categoriesCopy.push(value);
    }
    setFormData({ ...formData, [name]: categoriesCopy });
    console.log(categoriesCopy);
    console.log(formData.category);
  };

  const categories = ["Blockchain", "AI", "Metaverse", "Market", "Programming"];

  const generateSlug = (title: any) => {
    return title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "-") // Replace non-alphanumeric characters with '-'
      .replace(/-{2,}/g, "-") // Replace consecutive '-' with a single '-'
      .trim(); // Trim leading and trailing spaces
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    processSubmitBlog({
      event,
      formData,
      editor,
      file,
      wordCount,
      titleError,
      setTitleError,
      dateError,
      setDateError,
      categoryError,
      SetCategoryError,
      descError,
      setDescError,
      imageError,
      setImageError,
      contentError,
      setContentError,
      setShouldMsgShow,
    });
  };
  const handleImageChange = (value: File) => {
    setFile(value);
  };

  const [fileReader, setFileReader] = useState<FileReader>();

  useEffect(() => {
    const login = async () => {
      const result = await trpcClient.auth.signIn.mutate({
        email: "theo.thanhlam@gmail.com",
        password: "@Testpassword1234",
      });
      console.log(result);
    };
    login();
  }, []);

  useEffect(() => {
    // Instantiate the FileReader on the client side after DOM is hydrated
    if (!fileReader && typeof window !== "undefined") {
      setFileReader(new FileReader());
    }
    if (file) setImageError(false);
  }, [fileReader, file]);

  if (fileReader) {
    fileReader.onload = (event: any) => {
      if (event.target) {
        if (typeof event.target.result === "string") {
          setImageSrc(event.target.result);
        }
      }
    };
    fileReader.abort();
    if (file) fileReader.readAsDataURL(file);
  }

  const wordCount = (text: any) => {
    if (text == undefined) {
      return 0;
    }
    const words = text.trim().split(/\s+/);
    return words.length;
  };

  const isTitleValid = wordCount(formData.title) <= 25;
  const isDescriptionValid = wordCount(formData.description) <= 100;

  return (
    <form onSubmit={handleSubmit}>
      {shouldMsgShow &&
        !(
          categoryError ||
          dateError ||
          titleError ||
          descError ||
          imageError ||
          contentError
        ) && (
          <div className="fixed w-full min-h-full ">
            <div className="absolute border top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 border-opacity-20 dark:border-opacity-20 dark:bg-slate-800 dark:border-white border-black bg-slate-200 shadow-md z-50 rounded-xl drop-shadow-xl">
              <button
                className="absolute top-0 right-0 p-2 cursor-pointer font-semibold hover:bg-black hover:bg-opacity-30 rounded-xl "
                onClick={() => {
                  setShouldMsgShow(false);
                }}
              >
                x
              </button>
              <p className="text-xl font-semibold">Submission Successful!</p>
            </div>
          </div>
        )}

      <div className="mt-28 flex align-items justify-center mb-28 w-2/3 flex-col mx-auto bg">
        <div className="mx-auto text-4xl text-gray-700 dark:text-white">
          Post a Blog
        </div>
        {/* Date */}
        <DateCategorySection
          formData={formData}
          handleInputChange={handleInputChange}
          handleCategoryInputChange={handleCategoryInputChange}
          categories={categories}
          dateError={dateError}
          setDateError={setDateError}
          categoryError={categoryError}
          SetCategoryError={SetCategoryError}
        />

        {/* Title */}
        <div>
          <div className="mt-4">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
              className={`border w-full rounded-xl pl-[7px] py-2 text-white-700 leading-tight bg-slate-200 ${
                isTitleValid
                  ? "dark:bg-slate-800 dark:border-0 dark:border-opacity-100 border-opacity-50 border-black"
                  : "bg-red-200 dark:bg-red-700"
              } focus:outline-none focus:shadow-outline`}
              onFocus={() => setTitleError(false)}
              //             className="border w-full rounded-xl py-2 text-white leading-tight bg-transparent focus:outline-none focus:shadow-outline" -->
            />
            <p className="text-sm text-gray-500 dark:text-slate-300 flex justify-end mr-5 mt-2">
              {wordCount(formData.title)} / 25 words
            </p>
            {titleError && (
              <div className="text-red-600">Invalid Input for Title</div>
            )}
          </div>

          {/* Image Upload */}
          <div className="mt-4 mb-4 ">
            <input
              type="text"
              id="slug"
              name="slug"
              placeholder="Slug"
              value={formData.slug}
              readOnly
              className="border w-full rounded-xl pl-[7px] py-2 text-white-700 leading-tight bg-slate-200 dark:bg-slate-800 border-black dark:border-opacity-100 border-opacity-50 focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* <label className={`block mt-3 text-sm font-medium text-white `}>
            Image
          </label> */}
          <div className="rounded-xl bg-slate-200">
            <FileDragDrop image={file} setimage={handleImageChange} />
          </div>
          {imageError && (
            <div className="text-red-600">Invalid Input for Image</div>
          )}

          {/* Description */}
          <div className="mt-4">
            <div>
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className={`border w-full rounded-xl pl-[7px] py-2 text-white-700 leading-tight bg-slate-200 ${
                  isDescriptionValid
                    ? "border dark:bg-slate-800 border-black dark:border-opacity-100 border-opacity-50"
                    : "bg-black-700"
                } focus:outline-none focus:shadow-outline`}
                onFocus={() => setDescError(false)}
                //<!--               className="border  w-full rounded-xl py-2 text-white leading-tight bg-transparent focus:outline-none focus:shadow-outline"
              />
            </div>
            <p className="m-0 text-sm text-gray-500 dark:text-slate-300 flex justify-end mr-5">
              {wordCount(formData.description)} / 100 words
            </p>
            {descError && (
              <div className="text-red-600">Invalid Input for Description</div>
            )}
          </div>

          {/* Text Box */}
          <div className="mt-6 bg-slate-200 rounded-xl">
            <TextEditor editor={editor}></TextEditor>
          </div>
          <p className="m-0 text-sm text-gray-500 dark:text-slate-300 flex justify-end mr-5 mt-1">
            {wordCount(editor?.getText())} words
          </p>
          {contentError && (
            <div className="text-red-600">Invalid Input for Content</div>
          )}

          {/* Buttons */}
          <div className="flex justify-between">
            <NextLink href="/">
              <button className="mt-4 border border-gray-500 dark:border-slate-800 hover:bg-gray-800 rounded-xl hover:text-white dark:hover:bg-gray-500 text-gray-500 dark:text-white dark:hover:text-white font-bold py-4 px-16 focus:outline-none focus:shadow-outline">
                Cancel
              </button>
            </NextLink>
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 hover:text-white text-white font-bold py-4 px-16 rounded-xl focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default MyForm;
