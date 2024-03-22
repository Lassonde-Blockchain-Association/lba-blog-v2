import { db } from "../utils/db.server";

async function seed() {
  await Promise.all(
    getAuthors().map((author) => {
      return db.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName,
          email: author.email,
          password: "password",
        },
      });
    })
  );
  const author = await db.author.findFirst({
    where: {
      firstName: "Samson",
    },
  });
  if (!author) {
    throw new Error("Author not found");
  }

  await Promise.all(
    getBlogs().map((blog) => {
      const { title, description, content, imageUrl, category, datePublished } =
        blog;
      return db.blog.create({
        data: {
          title,
          description,
          content,
          imageUrl,
          category,
          datePublished,
          authorId: author.id,
        },
      });
    })
  );
}

function getAuthors() {
  return [
    {
      firstName: "Samson",
      lastName: "Chan",
      email: "samson@gmail.com",
    },
    {
      firstName: "Nikhil",
      lastName: "Sharma",
      email: "nikhil@gmail.com",
    },
    {
      firstName: "Daniel",
      lastName: "Kim",
      email: "daniel@gmail.com",
    },
  ];
}

function getBlogs() {
  return [
    {
      title: "What is Blockchain",
      description: "This is a description",
      content: "This is the content",
      imageUrl: "https://www.google.com",
      category: "Technology",
      datePublished: new Date(),
    },
    {
      title: "How much potnetial does Lassonde Blockchain have?",
      description: "This is a description",
      content: "This is the content",
      imageUrl: "https://www.google.com",
      category: "Technology",
      datePublished: new Date(),
    },
    {
      title: "How to make a blog",
      description: "This is a description",
      content: "This is the content",
      imageUrl: "https://www.google.com",
      category: "Technology",
      datePublished: new Date(),
    },
  ];
}
seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
