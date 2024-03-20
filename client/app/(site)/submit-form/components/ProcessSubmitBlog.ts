import { Editor } from "@tiptap/react";
import { Dispatch, SetStateAction } from "react";
import z from "zod";

interface processSubmitBlogProps {
  event: { preventDefault: () => void };
  formData: {
    title: string;
    slug: string;
    description: string;
    author: string;
    category: string[];
    date: string;
  };
  editor: Editor | null;
  file: File | undefined;
  wordCount: (text: any) => any;
  titleError: boolean;
  setTitleError: Dispatch<SetStateAction<boolean>>;
  dateError: boolean;
  setDateError: Dispatch<SetStateAction<boolean>>;
  categoryError: boolean;
  SetCategoryError: Dispatch<SetStateAction<boolean>>;
  descError: boolean;
  setDescError: Dispatch<SetStateAction<boolean>>;
  imageError: boolean;
  setImageError: Dispatch<SetStateAction<boolean>>;
  contentError: boolean;
  setContentError: Dispatch<SetStateAction<boolean>>;
  setShouldMsgShow: Dispatch<SetStateAction<boolean>>;
}

async function processSubmitBlog({
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
}: processSubmitBlogProps) {
  console.log("Categories: " + formData.category);
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
    category: formData.category,
    description: formData.description,
    content: editor?.getHTML().toString(),
    imageUrl: "",
  };

  try {
    BlogSchema.parse(submittedBlog);
  } catch (error) {
    alert("Incorrect formatting for submitting blog");
    console.log(error);
    return;
  }

  //   try {
  //     const response = await fetch("http://localhost:5000", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(submittedBlog),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Server responded with an error");
  //     }
  //     console.log("Blog submitted successfully:", await response.json());
  //     setShouldMsgShow(true);
  //   } catch (error) {
  //     console.log("Error trying to submit blog: ", error);
  //     alert("Server error with posting blog");
  //     return;
  //   }

  console.log("Title:", formData.title);
  console.log("Slug:", formData.slug);
  console.log("Description:", formData.description);
  console.log("Author:", formData.author);
  console.log("Category:", formData.category);
  console.log("Date:", formData.date);
  console.log("Image:", file);
  console.log("Content:", editor?.getHTML().toString());
  setShouldMsgShow(true);
}

const caseInsensitiveEnum = <T extends string>(values: T[]) =>
  z
    .string()
    .refine(
      (val) => values.map((v) => v.toLowerCase()).includes(val.toLowerCase()),
      {
        message: "Invalid enum value",
      }
    );

const categorySchema = caseInsensitiveEnum([
  "AI",
  "BLOCKCHAIN",
  "CLOUD",
  "DEVOPS",
  "METAVERSE",
  "NFT",
  "WEB3",
  "Market",
  "Programming",
]);

const BlogSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be 3 characters long" })
    .max(120, { message: "Title must be 120 characters or less" }),
  category: z.array(categorySchema).min(1),
  description: z
    .string()
    .min(3, { message: "Description must be more than 3 characters" })
    .max(512, { message: "Description must be 512 characters or less" }),
  content: z
    .string()
    .min(100, { message: "Content must be more than 100 characters" })
    .max(16384, { message: "Content must be 16384 characters or less" }),
  imageUrl: z.string(),
});

export default processSubmitBlog;
