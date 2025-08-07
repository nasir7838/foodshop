import React from "react";

const fallbackImg = "https://via.placeholder.com/150?text=No+Image";

const gradeColors = {
  a: "bg-green-500 text-white",
  b: "bg-lime-400 text-white",
  c: "bg-yellow-400 text-white",
  d: "bg-orange-400 text-white",
  e: "bg-red-500 text-white",
};

const ProductCard = ({ product }) => {
  const nutritionGrade = (product.nutrition_grades || "-").toLowerCase();
  const gradeColor = gradeColors[nutritionGrade] || "bg-gray-300 text-gray-700";
  const imageUrl = product.image_url || product.image_front_url || fallbackImg;
  const category = product.categories?.split(",")[0] || "N/A";

  return (
    <div className="border rounded-xl p-4 shadow-md bg-white flex flex-col items-center hover:shadow-xl transition-shadow duration-300 min-h-[340px] w-full">
      <img
        src={imageUrl}
        alt={product.product_name}
        className="w-32 h-32 object-cover mb-2 rounded-lg border"
        onError={e => (e.target.src = fallbackImg)}
      />
      <h2 className="text-lg font-bold mb-1 text-center line-clamp-2 min-h-[48px]">{product.product_name}</h2>
      <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-1">{category}</span>
      <p className="text-xs text-gray-500 mb-1 text-center line-clamp-2 min-h-[32px]">{product.ingredients_text || "No ingredients info."}</p>
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 ${gradeColor}`}>
        Nutrition Grade: {nutritionGrade.toUpperCase()}
      </span>
    </div>
  );
};

export default ProductCard; 