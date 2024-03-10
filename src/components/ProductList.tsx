import React from 'react';
import { Product } from './types';

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Units Sold</th>
          <th>Retail Sales</th>
          <th>Wholesale Sales</th>
          <th>Retailer Margin</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>
              <a href={`https://www.amazon.com/dp/${product.id}`} target="_blank" rel="noopener noreferrer">
                {product.title}
              </a>
            </td>
            <td>{product.sales[0].unitsSold}</td>
            <td>{product.sales[0].retailSales}</td>
            <td>{product.sales[0].wholesaleSales}</td>
            <td>{product.sales[0].retailerMargin}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};