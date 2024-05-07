"use client";
import "./styles.scss";
import { EditorContent, Editor } from "@tiptap/react";
import Toolbar from "./Toolbar";

type Props = {
  editor: Editor | null;
};

const TextEditor = ({ editor }: Props) => {
  return (
    <div className="">
      <div className="border-x border-t border-black dark:border-opacity-100 border-opacity-50 dark:dark:bg-slate-800  rounded-t-xl">
        <Toolbar editor={editor}></Toolbar>
      </div>

      <div className="overflow-y-auto h-48 border border-black dark:border-opacity-100 border-opacity-50 dark:dark:bg-slate-800  p-2 rounded-b-xl">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TextEditor;