export default function (seller) {
  return {
    firstName: seller.first_name,
    secondName: seller.second_name,
    isFavourite: seller.is_favorite,
    isVerified: seller.is_verified_seller,
  };
}
