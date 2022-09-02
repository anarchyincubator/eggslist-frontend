export default function (user) {
  return {
    avatar: user.avatar,
    bio: user.bio,
    email: user.email,
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    location: user.user_location,
    isEmail: user.is_email_verified,
    phone: user.phone_number,
    dateJoined: user.date_joined,
    isVerified: user.is_verified_seller,
  };
}
