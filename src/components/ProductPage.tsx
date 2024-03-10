import React, { useEffect, useState } from 'react';
import { loadProducts } from './data';
import { Product, Sale } from './types';
import styles from "./ProductPage.module.css";
import Header from './Header';
import ProductLineGraph from './ProductLineGraph';

type SortableKeys = keyof Sale;

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: 'ascending' | 'descending';
  } | null>({ key: 'weekEnding', direction: 'ascending' });

  useEffect(() => {
    loadProducts().then(setProducts);
  }, []);

  const sortedSalesData = React.useMemo(() => {
    let sortableItems = products.length > 0 ? [...products[0].sales] : [];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [products, sortConfig]);


  const requestSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: SortableKeys) => {
    if (sortConfig && sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '↓\u00A0' : '↑\u00A0';
    }
    return '⇵\u00A0'; // Default symbol indicating sortable column
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <Header />
        </div>
      </div>
      {products[0] && (
        <div className={styles.productContainer}>
          <div className={styles.productDetail}>
            <img src={products[0].image} alt={products[0].title} className={styles.productImage} />
            <h1 className={styles.productTitle}>{products[0].title}</h1>
            <p className={styles.productSubtitle}>{products[0].subtitle}</p>
            <div className={styles.tagsContainer}>
              {products[0].tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className={styles.salesSection}>
            <div className={styles.salesGraph}>
              <h2>Retail Sales</h2>
              <ProductLineGraph products={[products[0]]} />
            </div>

            <div className={styles.salesTable}>
            <div className={styles.tableWrapper} >
            <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
              <th className={styles.th} onClick={() => requestSort('weekEnding')}>
                    {getSortIndicator('weekEnding')}Week Ending
              </th>
              <th className={styles.th} onClick={() => requestSort('retailSales')}>
                    {getSortIndicator('retailSales')}Retail Sales
              </th>
              <th className={styles.th} onClick={() => requestSort('wholesaleSales')}>
                    {getSortIndicator('wholesaleSales')}Wholesale Sales
              </th>
              <th className={styles.th} onClick={() => requestSort('unitsSold')}>
                    {getSortIndicator('unitsSold')}Units Sold
              </th>
              <th className={styles.th} onClick={() => requestSort('retailerMargin')}>
                    {getSortIndicator('retailerMargin')}Retailer Margin
              </th>
              </tr>
            </thead>
            <tbody>
              {sortedSalesData.map((sale, index) => (
                <tr key={index} className={styles.tr}>
                  <td className={styles.td}>{sale.weekEnding}</td>
                  <td className={styles.td}>{sale.retailSales}</td>
                  <td className={styles.td}>{sale.wholesaleSales}</td>
                  <td className={styles.td}>{sale.unitsSold}</td>
                  <td className={styles.td}>{sale.retailerMargin}</td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
