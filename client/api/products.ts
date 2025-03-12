const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function listProducts() {
  // https://mohan-commerce.vercel.app/products
  const res = await fetch(`${API_URL}/products`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Error");
  }

  // console.log("data: ", data);
  return data;
}

export async function fetchProductById(id: number) {
  const res = await fetch(`${API_URL}/products/${id}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Error");
  }

  // console.log("data: ", data);
  return data;
}
