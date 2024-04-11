import { Blog } from "./Blog";

export type Author = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  Blogs: Blog[];
};
