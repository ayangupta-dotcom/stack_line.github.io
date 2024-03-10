import { combineReducers } from '@reduxjs/toolkit';
import productLoaderReducer from './productLoaderSlice'; // Notice the lack of curly braces

const rootReducer = combineReducers({
  productLoader: productLoaderReducer, // Use the imported default export
});

export default rootReducer;
