// src/types.ts
export interface Review {
    customer: string;
    review: string;
    score: number;
  }
  
  export interface Sale {
    weekEnding: string;
    retailSales: number;
    wholesaleSales: number;
    unitsSold: number;
    retailerMargin: number;
  }
  
  // src/types/index.ts or wherever you define your types

export interface Product {
    id: string;
    title: string;
    image: string; // Assuming image URL
    subtitle: string;
    tags: string[];
    sales: {
      weekEnding: string;
      retailSales: number;
      wholesaleSales: number;
      unitsSold: number;
      retailerMargin: number;
    }[];
  }
  
  