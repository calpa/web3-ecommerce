'use client';

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from './components/Card';
import { CircularProgress } from '@mui/material';

// Imported products.json
import products from './mockdata/products.json';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  quantity_in_stock: number;
  average_rating: number;
}

const ProductList: React.FC = () => {
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [ratingSortOrder, setRatingSortOrder] = useState<'' | 'asc' | 'desc'>('');
  const [priceSortOrder, setPriceSortOrder] = useState<'' | 'asc' | 'desc'>('');

  useEffect(() => {
    // Initialize with unsorted products
    setSortedProducts(products);
    sortProductsByRating('desc');
  }, []);

  const sortProductsByRating = (order: 'asc' | 'desc') => {
    const sortedProducts = [...products].sort((a, b) =>
      order === 'asc' ? a.average_rating - b.average_rating : b.average_rating - a.average_rating
    );
    setSortedProducts(sortedProducts);
    setRatingSortOrder(order);
    setPriceSortOrder('');
  };

  const sortProductsByPrice = (order: 'asc' | 'desc') => {
    const sortedProducts = [...products].sort((a, b) =>
      order === 'asc' ? a.price - b.price : b.price - a.price
    );
    setSortedProducts(sortedProducts);
    setPriceSortOrder(order);
    setRatingSortOrder('');
  };

  const handleProductSelect = (product: Product) => {
    console.log(product);
  };

  return (
    <div className="p-4">
      <div className="flex mb-4">
        <h1 className="text-3xl font-bold">Web3 Shop</h1>
        <ButtonGroup variant="outlined" className="ml-auto mr-2">
          <Button
            onClick={() => sortProductsByRating('asc')}
            style={{ backgroundColor: ratingSortOrder === 'asc' ? '#ccc' : 'transparent' }}
            disabled={ratingSortOrder === 'asc'}
          >
            Rating (ASC)
          </Button>
          <Button
            onClick={() => sortProductsByRating('desc')}
            style={{ backgroundColor: ratingSortOrder === 'desc' ? '#ccc' : 'transparent' }}
            disabled={ratingSortOrder === 'desc'}
          >
            Rating (DESC)
          </Button>
          <Button
            onClick={() => sortProductsByPrice('asc')}
            style={{ backgroundColor: priceSortOrder === 'asc' ? '#ccc' : 'transparent' }}
            disabled={priceSortOrder === 'asc'}
          >
            Price (ASC)
          </Button>
          <Button
            onClick={() => sortProductsByPrice('desc')}
            style={{ backgroundColor: priceSortOrder === 'desc' ? '#ccc' : 'transparent' }}
            disabled={priceSortOrder === 'desc'}
          >
            Price (DESC)
          </Button>
        </ButtonGroup>

        <w3m-button />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <Card key={product.id} product={product} handleProductSelect={handleProductSelect} />
          ))
        ) : (
          <div>
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;