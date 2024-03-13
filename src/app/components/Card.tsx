import React from 'react';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    quantity_in_stock: number;
    average_rating: number;
}

interface Props {
    product: Product;
    handleProductSelect: (product: Product) => void;
    balance: number;
}

const ProductCard: React.FC<Props> = ({ product, handleProductSelect, balance }) => {

    return (
        <Card className="border border-gray-200 rounded-lg overflow-hidden transition duration-300 shadow-md hover:shadow-lg">
            <CardMedia
                component="img"
                image={product.image_url}
                alt={product.name}
                className="object-cover w-full h-64 rounded-t-lg"
            />
            <CardContent>
                <Typography variant="h5" component="h2" className="font-semibold">
                    {product.name}
                </Typography>
                <Typography variant="body1" className="truncate">
                    {product.description}
                </Typography>
                <Typography variant="body1" className="mt-2">Price: {product.price} ETH</Typography>
                <Typography variant="body1" className="mt-1">In Stock: {product.quantity_in_stock}</Typography>
                <Rating value={product.average_rating} readOnly />
            </CardContent>
            <Button
                onClick={() => handleProductSelect(product)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-b-lg focus:outline-none focus:shadow-outline w-full"
                disabled={product.price > balance}
            >
                Purchase
            </Button>
        </Card>
    );
};

export default ProductCard;
