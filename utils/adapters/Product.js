import Seller from "./Seller";
export default function (product) {
  return {
    title: product.title,
    image: product.image,
    price: product.price,
    slug: product.slug,
    seller: product.seller && Seller(product.seller),
  };
}
