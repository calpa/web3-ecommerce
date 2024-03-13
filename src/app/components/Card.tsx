import React from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    quantity_in_stock: number;
}

interface Props {
    product: Product;
    handleProductSelect: (product: Product) => void;
}

const Card: React.FC<Props> = ({ product, handleProductSelect }) => {
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden transition duration-300 shadow-md hover:shadow-lg">
            <div className="relative">
                <img src={product.image_url} alt={product.name} className="object-cover w-full h-64 rounded-t-lg" />
                <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 py-2 px-4 text-white text-sm">
                    <h2 className="font-semibold">{product.name}</h2>
                    <p className="truncate">{product.description}</p>
                    <p className="mt-2">Price: {product.price} ETH</p>
                    <p className="mt-1">In Stock: {product.quantity_in_stock}</p>
                </div>
            </div>
            <button
                onClick={() => handleProductSelect(product)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-b-lg focus:outline-none focus:shadow-outline w-full"
            >
                Select
            </button>
        </div>
    );
};

export default Card;
