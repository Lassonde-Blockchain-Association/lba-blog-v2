interface blogType {
  title: string;
  category: string[];
  description: string;
  content: string;
  imageUrl: "";
}

export default function cleanseSubmittedBlog(blog: blogType): blogType {
  var cleansedBlog = blog;
  cleansedBlog.title = cleansedBlog.title.replace("<script>", "&lt;script>");
  cleansedBlog.description = cleansedBlog.description.replace(
    "<script>",
    "&lt;script>"
  );
  cleansedBlog.content = cleansedBlog.content.replace(
    "<script>",
    "&lt;script>"
  );

  return cleansedBlog;
}
