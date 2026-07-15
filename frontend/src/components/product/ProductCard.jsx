import React from 'react';
import { Link } from 'react-router-dom';
const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">

            <img
                src={
                    product.image
                        ? `http://127.0.0.1:8000/storage/${product.image}`
                        : "https://placehold.co/300x300?text=No+Image"
                }
                alt={product.name}
                className="w-full h-56 object-cover rounded"
            />

            <h2 className="text-xl font-semibold mt-4">
                {product.name}
            </h2>

            <p className="text-gray-500 mt-2 line-clamp-2">
                {product.description}
            </p>

            <p className="text-blue-600 font-bold text-lg mt-3">
                ${Number(product.price).toFixed(2)}
            </p>

            <Link
                to={`/products/${product.id}`}
                className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                View Details
            </Link>

        </div>
    );
}

export default ProductCard;
