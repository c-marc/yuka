const OFF_BASE_URL = "https://world.openfoodfacts.org/api/v2";

export async function getProducts(codes) {
  const fields = [
    "code",
    "product_name",
    "brand_owner",
    "nutriscore_grade",
    "nutriscore_score",
    "image_small_url",
  ];
  const query = `?code=${codes.join(",")}&fields=${fields.join(",")}`;
  const url = `${OFF_BASE_URL}/search${query}`;

  try {
    const result = await axios.get(url);
    return result.data.products;
  } catch (error) {
    if (error.response?.data.error.message) {
      throw new Error(error.response.data.error.message);
    }
    throw new Error("Getting products failed");
  }
}

export async function getProduct(code) {
  const fields = [
    "code",
    "product_name",
    "brand_owner",
    "nutriscore_grade",
    "nutriscore_score",
    "nutriscore_data",
    "image_small_url",
  ];
  const query = `?fields=${fields.join(",")}`;
  const url = `${OFF_BASE_URL}/product/${code}${query}`;

  try {
    const result = await axios.get(url);
    return result.data.products;
  } catch (error) {
    if (error.response?.data.error.message) {
      throw new Error(error.response.data.error.message);
    }
    throw new Error("Getting products failed");
  }
}
