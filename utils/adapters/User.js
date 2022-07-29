export default function (user) {
  return {
    avatar: user.avatar,
    bio: user.bio,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    location: user.user_location,
    isEmail: user.is_email_verified,
    isVerified: user.is_verified_seller,
  };
}
