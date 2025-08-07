import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import SearchBar from "../components/SearchBar.jsx";
import ProductList from "../components/ProductList.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { searchProductsByName, fetchProductsByCategory } from "../services/api.js";

const RANDOM_CATEGORIES = [
  "fruits", "snacks", "beverages", "dairies", "meals", "breakfasts", "desserts", "cereals", "biscuits", "sauces"
];
const DEFAULT_CATEGORY = "fruits";

function getRandomCategory() {
  return RANDOM_CATEGORIES[Math.floor(Math.random() * RANDOM_CATEGORIES.length)];
}

const Home = forwardRef((props, ref) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [randomProduct, setRandomProduct] = useState(null);
  const [fade, setFade] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useImperativeHandle(ref, () => ({
    refreshHome: () => {
      setFade(true);
      setTimeout(() => {
        setSearchQuery("");
        setProducts([]);
        loadRandomProduct();
        loadDefaultProducts();
        setFade(false);
      }, 350); // match fade duration
    }
  }));

  useEffect(() => {
    loadRandomProduct();
    loadDefaultProducts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error) {
      document.title = "Failed to Fetch - Food Product Explorer";
    } else {
      document.title = "Food Product Explorer";
    }
  }, [error]);

  const loadRandomProduct = async () => {
    setLoading(true);
    setError("");
    try {
      const category = getRandomCategory();
      const data = await fetchProductsByCategory(category, 1, 20);
      const productsArr = data.products || [];
      if (productsArr.length > 0) {
        const random = productsArr[Math.floor(Math.random() * productsArr.length)];
        setRandomProduct(random);
      } else {
        setRandomProduct(null);
      }
    } catch (err) {
      setError("Failed to fetch a random product. Please try again.");
      setRandomProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const loadDefaultProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchProductsByCategory(DEFAULT_CATEGORY, 1, 20);
      setProducts(data.products || []);
    } catch (err) {
      setError("Failed to fetch default products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setLoading(true);
    setError("");
    try {
      const data = await searchProductsByName(query);
      setProducts(data.products || []);
    } catch (err) {
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 opacity-80" />

      {/* Fade animation wrapper */}
      <div className={`transition-opacity duration-350 ${fade ? 'opacity-0' : 'opacity-100'}`}>
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-green-400 to-blue-400 shadow-lg mb-2 animate-bounce">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v9" /></svg>
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-2 drop-shadow-lg">Food Product Explorer</h1>
          </div>
          <p className="text-lg text-gray-700 mb-6">Discover, search, and explore food products from around the world. <span className="font-semibold text-green-700">Powered by OpenFoodFacts.</span></p>
        </div>

        {/* Random Product Section */}
        {loading && <p className="text-center text-blue-600 font-semibold">Loading...</p>}
        {randomProduct && (
          <div className="max-w-xl mx-auto mb-10 bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-green-700 mb-3 text-center">Featured Random Product</h2>
            <ProductCard product={randomProduct} />
          </div>
        )}

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-8 bg-white rounded-lg shadow p-6 border border-gray-100">
          <SearchBar onSearch={handleSearch} value={searchQuery} />
        </div>

        {/* Product List Section */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">{products.length ? "Products" : "Popular Fruits"}</h2>
          {products.length ? (
            <ProductList products={products} />
          ) : (
            <div className="text-center text-gray-500 py-12">
              <svg className="mx-auto mb-4 w-16 h-16 text-blue-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 018 0v2m-4-4v4m0 0v4m0-4H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-7z" /></svg>
              <p className="text-lg">No products to display. Try searching for something!</p>
            </div>
          )}
        </div>
      </div>

      {/* Custom animation for background gradient and fade */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 10s ease-in-out infinite;
        }
        .transition-opacity {
          transition-property: opacity;
        }
        .duration-350 {
          transition-duration: 350ms;
        }
      `}</style>
    </div>
  );
});

export default Home; 