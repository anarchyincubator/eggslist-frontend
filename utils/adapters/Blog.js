import Seller from "./Seller";
export default function (blog) {
  return {
    title: blog.title,
    image: blog.image,
    category: blog.category,
    seller: blog.seller && Seller(blog.seller),
  };
}
