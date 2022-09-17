export const localStorageKeyCity = "eggslist:city";
export const localStorageKeyAuth = "eggslist:token";

export default { localStorageKeyCity, localStorageKeyAuth };

export function generateFormDataProduct(data) {
  const formData = new FormData();

  if (data.image) formData.append("image", data.image);

  formData.append("title", data.title);

  if (data.description) formData.append("description", data.description);

  if (data.subcategory) formData.append("subcategory", data.subcategory);

  if (data.pickup) formData.append("allow_pickup", data.pickup);

  if (data.delivery) formData.append("allow_delivery", data.delivery);

  if (data.price) formData.append("price", data.price);

  return formData;
}
