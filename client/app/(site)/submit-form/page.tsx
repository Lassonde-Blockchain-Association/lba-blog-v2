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

import z from "zod";

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

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    author: "",
    category: "",
    date: "",
  });

  const BlogSchema = z.object({
    title: z
      .string()
      .min(3, { message: "Title must be 3 characters long" })
      .max(120, { message: "Title must be 120 characters or less" }),
    category: z.enum([
      "AI",
      "BLOCKCHAIN",
      "CLOUD",
      "DEVOPS",
      "METAVERSE",
      "NFT",
      "WEB3",
    ]),
    description: z
      .string()
      .min(3, { message: "Description must be more than 3 characters" })
      .max(512, { message: "Description must be 512 characters or less" }),
    content: z
      .string()
      .min(100, { message: "Content must be more than 100 characters" })
      .max(16384, { message: "Content must be 16384 characters or less" }),
    imageUrl: z.string(),

    //imageUrl: z.string().url(),
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

  const categories = ["Blockchain", "AI", "Metaverse", "Market", "Programming"];

  const generateSlug = (title: any) => {
    return title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "-") // Replace non-alphanumeric characters with '-'
      .replace(/-{2,}/g, "-") // Replace consecutive '-' with a single '-'
      .trim(); // Trim leading and trailing spaces
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!formData.category) {
      SetCategoryError(true);
    }

    if (!formData.date) {
      setDateError(true);
    }

    if (editor?.getText() === "") {
      setContentError(true);
    } else {
      setContentError(false);
    }

    if (!formData.title || wordCount(formData.title) > 25) {
      setTitleError(true);
    }

    if (!formData.description || wordCount(formData.description) > 100) {
      setDescError(true);
    }

    if (!file) {
      setImageError(true);
    }

    if (
      categoryError ||
      dateError ||
      titleError ||
      descError ||
      imageError ||
      contentError
    ) {
      setShouldMsgShow(false);
      return;
    }

    const submittedBlog = {
      title: formData.title,
      category: formData.category.toUpperCase(),
      description: formData.description,
      content: editor?.getHTML().toString(),
      //imageUrl: file?.webkitRelativePath,
      imageUrl: "",
    };

    try {
      BlogSchema.parse(submittedBlog);
    } catch {
      alert("Incorrect formatting for submitting blog");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submittedBlog),
        // body: JSON.stringify({
        //   title: formData.title,
        //   category: formData.category,
        //   description: formData.description,
        //   content: editor?.getHTML().toString(),
        //   imageURL: file?.webkitRelativePath,
        // }),
      });
      if (!response.ok) {
        throw new Error("Server responded with an error");
      }
      console.log("Blog submitted successfully:", await response.json());
      setShouldMsgShow(true);
    } catch (error) {
      console.log("Error trying to submit blog: ", error);
      alert("Server error with posting blog");
      return;
    }

    console.log("Title:", formData.title);
    console.log("Slug:", formData.slug);
    console.log("Description:", formData.description);
    console.log("Author:", formData.author);
    console.log("Category:", formData.category);
    console.log("Date:", formData.date);
    console.log("Image:", file);
    console.log("Content:", editor?.getHTML().toString());
    setShouldMsgShow(true);
  };
  const handleImageChange = (value: File) => {
    setFile(value);
  };

  const [fileReader, setFileReader] = useState<FileReader>();

  useEffect(() => {
    // Instantiate the FileReader on the client side after DOM is hydrated
    if (!fileReader && typeof window !== "undefined") {
      setFileReader(new FileReader());
    }
    if (file) setImageError(false);
  }, [fileReader, file]);

  if (fileReader) {
    fileReader.onload = (event: any) => {
      //   useEffect(() => {
      //     const reader = new FileReader();
      //     reader.onload = (event) => {
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
  //     if (file) reader.readAsDataURL(file);
  //  }, [file]);

  // const reader = new FileReader();
  // reader.onload = (event) => {
  //   if (event.target) {
  //     if (typeof event.target.result === "string") {
  //       setImageSrc(event.target.result);
  //     }
  //   }
  // };
  // if (file) reader.readAsDataURL(file);

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
        {/* <div className="mt-4">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="border w-full rounded-xl py-2 text-white leading-tight bg-slate-800 focus:outline-none focus:shadow-outline"
          />

        </div> */}

        {/* Date */}
        <div className="flex flex-row justify-between space-x-56">
          <div className="mt-4 flex-grow">
            {/* <label htmlFor="date" className="mb-2">
              Date:
            </label> */}
            {/* <div className="flex-1"> */}
            <input
              type="text"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              placeholder="Date"
              className="border w-full placeholder-white-500 rounded-xl pl-[7px] py-2 text-white-700 leading-tight bg-slate-200 dark:bg-slate-800 dark:border-0 dark:border-opacity-100 border-opacity-50 border-black focus:outline-none focus:shadow-outline"
              onFocusCapture={() => setDateError(false)}
            />
            {/* </div> */}
            {dateError && (
              <div className="text-red-600">The Date Field is Empty!</div>
            )}
          </div>

          {/* Category */}
          <div className="mt-4 flex-grow">
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="border w-full rounded-xl pl-[7px] py-2 text-white-700 leading-tight bg-slate-200 dark:bg-slate-800 dark:border-0 dark:border-opacity-100 border-opacity-50 border-black focus:outline-none focus:shadow-outline"
              onFocus={() => SetCategoryError(false)}
            >
              <option value="" disabled style={{ color: "white" }}>
                Category
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category} style={{ color: "black" }}>
                  {category}
                </option>
              ))}
            </select>
            {categoryError && (
              <div className="text-red-600">Invalid Input for Category</div>
            )}
          </div>
        </div>

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
              //<!--             onChange={handleInputChange}
              //        className="border w-full rounded-xl py-2 text-white leading-tight bg-transparent focus:outline-none focus:shadow-outline"
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

// This is seperate code for Adding Images
interface FileDragDrop {
  image?: File;
  setimage: (value: File) => void;
}

const FileDragDrop: React.FC<FileDragDrop> = ({ image, setimage }) => {
  const [uploadedFile, setUploadedFile] = useState<File>();
  const [isDragging, setIsDragging] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [fileReader, setFileReader] = useState<FileReader>();
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Instantiate the FileReader on the client side after DOM is hydrated
    if (!fileReader && typeof window !== "undefined") {
      setFileReader(new FileReader());
    }
    setImgError(imgError);
  }, [fileReader]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      e.relatedTarget === undefined ||
      e.currentTarget.contains(e.relatedTarget as Node)
    ) {
      return;
    }

    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const newFile = e.dataTransfer.files[0];
    const fileExtension = newFile.name.split(".").pop()?.toLowerCase();

    if (/^image\//.test(newFile.type)) {
      setUploadedFile(newFile);
      setimage(newFile);
    } else {
      alert("Invalid file format. Only image files are accepted.");
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: Event) => {
      const newFile = (e.target as HTMLInputElement).files?.[0];
      if (newFile && /^image\//.test(newFile.type)) {
        setUploadedFile(newFile);
        setimage(newFile);
        if (fileReader) {
          fileReader.onload = (event: any) => {
            if (event.target) {
              if (typeof event.target.result === "string") {
                setImageSrc(event.target.result);
              }
            }
          };
          fileReader.readAsDataURL(newFile);
        }
      } else {
        alert("Invalid file format. Only image files are accepted.");
      }
    };
    input.click();
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`border dark:border-2 sm:text-lg dark:bg-slate-800 border-opacity-50 border-black text-base rounded-xl cursor-pointer w-auto min-h-[10rem] flex items-center justify-center flex-col flex-nowrap dark:text-white  dark:border-white dark:border-opacity-[0.35] rounded-xl-lg `}
    >
      {uploadedFile && (
        <div>You can drop another image to replace the older one</div>
      )}
      {imageSrc && (
        <img src={imageSrc} alt="Selected Image" height={400} width={400} />
      )}
      {uploadedFile ? (
        <div> {`${uploadedFile.name}`} </div>
      ) : (
        "Click or drag and drop your image here"
      )}
    </div>
  );
};

export default MyForm;
