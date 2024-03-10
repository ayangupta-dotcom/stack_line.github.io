import { Product } from '../types';

import axios from 'axios';

export const loadProducts = (): Promise<Product[]> => {
  const url = `${process.env.PUBLIC_URL}/data/data.json`; // This constructs the URL based on your PUBLIC_URL environment variable
  return axios.get(url)
    .then(response => response.data as Product[]); // Cast the response data to your Product[] type
};

  
  