const BASE_URL = "https://world.openfoodfacts.org";

export const fetchProductsByCategory = async (category, page = 1, pageSize = 20) => {
  const url = `${BASE_URL}/category/${category}.json?page=${page}&page_size=${pageSize}`;
  const res = await fetch(url);
  return res.json();
};

export const searchProductsByName = async (name, page = 1, pageSize = 20) => {
  const url = `${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(name)}&json=true&page=${page}&page_size=${pageSize}`;
  const res = await fetch(url);
  return res.json();
};

export const fetchProductByBarcode = async (barcode) => {
  const url = `${BASE_URL}/api/v0/product/${barcode}.json`;
  const res = await fetch(url);
  return res.json();
};

export const fetchCategories = async () => {
  const url = `${BASE_URL}/categories.json`;
  const res = await fetch(url);
  return res.json();
}; 