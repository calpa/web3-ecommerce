'use client'

import Card from './components/Card';

// Generated from https://www.mockaroo.com/schemas/new
import products from './mockdata/products.json';

const ProductList = () => {
  const handleProductSelect = () => { };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Shop</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} product={product} handleProductSelect={handleProductSelect} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
