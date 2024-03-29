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
    balance: bigint | undefined;
}

const ProductCard: React.FC<Props> = ({ product, handleProductSelect, balance }) => {

    return (
        <div className="flex border border-gray-200 my-2">
            <img src={product.image_url} className='w-64 h-64 object-contain' />
            <div className="flex flex-col ml-4 w-full pr-2">
                <div className="font-bold hover:text-orange-400 cursor-pointer flex flex-row justify-between w-full">
                    {product.name}
                    <div className="font-normal text-sm">ID: {product.id}</div>
                </div>

                <Rating value={product.average_rating} readOnly />
                10K+ bought in past month

                <div className="bg-red-800 text-white p-1 text-xs w-[128px] text-center">
                    Limited time deal
                </div>

                <div>
                    <div className="font-bold text-lg">
                        {product.price} ETH
                    </div>
                    <div>List: $39.99</div>
                </div>

                <div>FREE delivery</div>
                <div>on your first order</div>
                <Button
                    onClick={() => handleProductSelect(product)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-32"
                    disabled={product.price > Number(balance)}
                >
                    Purchase
                </Button>
            </div>
        </div >

        // <Card className="border border-gray-200 rounded-lg overflow-hidden transition duration-300 shadow-md hover:shadow-lg">
        //     <CardMedia
        //         component="img"
        //         image={product.image_url}
        //         alt={product.name}
        //         className="object-cover w-full h-64 rounded-t-lg"
        //     />
        //     <CardContent>
        //         <Typography variant="h5" component="h2" className="font-semibold">
        //             {product.name}
        //         </Typography>
        //         <Typography variant="body1" className="truncate">
        //             {product.description}
        //         </Typography>
        //         <Typography variant="body1" className="mt-2">Price: {product.price} ETH</Typography>
        //         <Typography variant="body1" className="mt-1">In Stock: {product.quantity_in_stock}</Typography>
        //         <Rating value={product.average_rating} readOnly />
        //     </CardContent>

        // </Card>
    );
};

export default ProductCard;
