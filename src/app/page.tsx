'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from './components/ProductCard';
import { CircularProgress } from '@mui/material';
import { writeContract } from '@wagmi/core'

// Imported products.json
import products from './mockdata/products.json';
import { config } from '@/config';
import { parseEther } from 'viem';
import { abi } from './abi';

import { useBalance, useAccount } from 'wagmi'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { decrement, increment } from '@/lib/features/counter/counterSlice';
import Search from './components/Search';
import { change } from '@/lib/features/search/searchSlice';


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

  const account = useAccount();
  const balance = useBalance({
    address: account.address,
  });

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

  // TODO: Change Contract address, abi, function name, args
  const handleProductSelect = async (product: Product) => {
    await writeContract(config, {
      abi,
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      functionName: 'transferFrom',
      args: [
        '0xd2135CfB216b74109775236E36d4b433F1DF507B',
        '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        123n,
      ],
      value: parseEther(String(product.price)),
    })
  };

  const searchState = useAppSelector(state => state.search);
  const dispatch = useAppDispatch();
  const searchValue = searchState.value;

  const filteredProducts = useMemo(() => {
    return sortedProducts.filter(product => {
      if (product.name.toLowerCase().includes(searchValue) || product.description.toLowerCase().includes(searchValue)) {
        return true;
      }
    });
  }, [sortedProducts, searchValue])



  return (
    <div>
      <div className="bg-blue-800 text-white py-4 px-4 font-bold text-lg flex flex-row items-center">
        <div className="">
          Wmazon
        </div>
        <Search />

      </div>
      <div className="p-4">
        <div className="flex mb-4">
          <div>
            {filteredProducts.length} over 30,000 results for <br /><div className="text-orange-800">&quot;{searchValue ? searchValue : 'All Products'}&quot;</div>
          </div>
          {/* <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>

        {counterState.value} */}
          {/* {account.address} */}
          {/* {String(balance?.data?.value)} */}
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

        <div className="">
          <div className="font-bold">Results</div>
          <div>Check each product page for other buying options.</div>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card key={product.id} product={product} handleProductSelect={handleProductSelect}
                balance={balance?.data?.value}
              />
            ))
          ) : (
            <div className="flex flex-row justify-center">
              <button onClick={() => dispatch(change(''))}
                className="bg-blue-400 rounded-md p-4 text-white"
              >Reset Search</button>
              {/* <CircularProgress /> */}
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default ProductList;
