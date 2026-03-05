export default function (category) {
  return {
    name: category.name,
    slug: category.slug,
    image: category.image,
    subs: category.subcategories,
    isListing: category.is_listing,
  };
}
