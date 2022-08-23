export default function (seller) {
  return {
    firstName: seller.first_name,
    lastName: seller.last_name,
    isFavourite: seller.is_favorite,
    isVerified: seller.is_verified_seller,
    phoneNumber: seller.phone_number,
    location: seller.location,
    avatar: seller.avatar,
  };
}
