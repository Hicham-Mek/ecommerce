import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api/axios';

const ProductDetails = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!product) {
        return <h2>Product not found.</h2>;
    }

    return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <img
            src={
                product.image
                    ? `http://127.0.0.1:8000/storage/${product.image}`
                    : "https://placehold.co/500x500?text=No+Image"
            }
            alt={product.name}
            className="rounded-lg shadow"
        />

        <div>

            <h1 className="text-4xl font-bold">
                {product.name}
            </h1>

            <p className="text-2xl text-blue-600 font-bold mt-4">
                ${Number(product.price).toFixed(2)}
            </p>

            <p className="mt-4">
                <strong>Category:</strong>{" "}
                {product.category?.name}
            </p>

            <p className="mt-2">
                <strong>Stock:</strong>{" "}
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            <p className="mt-6 text-gray-700">
                {product.description}
            </p>

            <div className="flex gap-4 mt-8">

                <button className="bg-blue-600 text-white px-6 py-3 rounded">
                    Add to Cart
                </button>

                <button className="border border-red-500 text-red-500 px-6 py-3 rounded">
                    Add to Wishlist
                </button>

            </div>

        </div>

    </div>
);
};

export default ProductDetails;
