import Author from "./Author";
export default function (blog) {
  return {
    title: blog.title,
    image: blog.image,
    body: blog.body,
    slug: blog.slug,
    category: blog.category,
    author: blog.author && Author(blog.author),
  };
}
