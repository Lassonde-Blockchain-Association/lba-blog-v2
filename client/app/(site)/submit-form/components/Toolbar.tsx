"use client";
import { type Editor } from "@tiptap/react";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Underline,
  Heading2,
  Link,
} from "lucide-react";
import { Toggle } from "./ui/toggle";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "./ui/select";
import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";

type Props = {
  editor: Editor | null;
};

const Toolbar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  const [selectValue, setSelectValue] = useState<String>("normal");

  // Find the node type at the current cursor position
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  function setLink() {
    if (editor === null) {
      return;
    }
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }
  if (editor != null) {
    useEffect(() => {
      if (selectValue === "h1") {
        editor.chain().focus().toggleHeading({ level: 1 }).run();
      } else if (selectValue === "h2") {
        editor.chain().focus().toggleHeading({ level: 2 }).run();
      } else if (selectValue === "h3") {
        editor.chain().focus().toggleHeading({ level: 3 }).run();
      } else if (selectValue === "h4") {
        editor.chain().focus().toggleHeading({ level: 4 }).run();
      } else if (selectValue === "blockquote") {
        if (editor.isActive("heading"))
          editor.chain().focus().toggleHeading({ level: 1 }).run();

        if (editor.isActive("heading"))
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        editor.chain().focus().toggleBlockquote().run();
      } else {
        if (editor.isActive("heading"))
          editor.chain().focus().toggleHeading({ level: 1 }).run();

        if (editor.isActive("heading"))
          editor.chain().focus().toggleHeading({ level: 1 }).run();

        if (editor.isActive("blockquote"))
          editor.chain().focus().toggleBlockquote().run();
      }

      if (editor.isActive("blockquote") && editor.isActive("heading"))
        editor.chain().focus().toggleBlockquote().run();
    }, [selectValue]);
  }

  return (
    <div className="flex justify-start">
      <select
        id="selectValue"
        // value={selectValue}
        onChange={handleSelectChange}
        className="px-2 w-[180px] bg-slate-200 dark:dark:bg-slate-800 rounded-tl-xl"
      >
        <option selected={editor.isActive("normal")} value="normal">
          Normal
        </option>
        <option
          selected={editor.isActive("heading", { level: 1 })}
          className="text-3xl font-semibold select-text"
          value="h1"
        >
          Heading 1
        </option>
        <option
          selected={editor.isActive("heading", { level: 2 })}
          className="text-2xl font-semibold select-text"
          value="h2"
        >
          <p>Heading 2</p>
        </option>
        <option
          selected={editor.isActive("heading", { level: 3 })}
          className="text-xl font-semibold select-text"
          value="h3"
        >
          <p>Heading 3</p>
        </option>
        <option
          selected={editor.isActive("heading", { level: 4 })}
          className="text-lg font-semibold select-text"
          value="h4"
        >
          <p>Heading 4</p>
        </option>
        <option
          selected={editor.isActive("blockquote")}
          className="select-text"
          value="blockquote"
        >
          <p>| Quote</p>
        </option>
      </select>
      <div className="border-l dark:dark:bg-slate-800 border-black dark:border-opacity-100 border-opacity-50 ">
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          {" "}
          <Bold></Bold>
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          {" "}
          <Italic></Italic>
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("underline")}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        >
          {" "}
          <Underline></Underline>
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("strikethrough")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          {" "}
          <Strikethrough></Strikethrough>
        </Toggle>
      </div>
      <div className="border-l dark:dark:bg-slate-800 border-black dark:border-opacity-100 border-opacity-50">
        <Toggle
          size="sm"
          pressed={editor.isActive("bulletList")}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          {" "}
          <List></List>
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("orderedList")}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          {" "}
          <ListOrdered></ListOrdered>
        </Toggle>
      </div>
      <div className="border-l dark:dark:bg-slate-800 border-black dark:border-opacity-100 border-opacity-50">
        <Toggle
          size="sm"
          pressed={editor.isActive("link")}
          onPressedChange={() => setLink()}
        >
          {" "}
          <Link></Link>
        </Toggle>
      </div>
    </div>
  );
};

export default Toolbar;
