import React from 'react';
import { Provider } from 'react-redux';
import { store } from './components/store';
import ProductPage from './components/ProductPage';
import ProductLineGraph from './components/ProductLineGraph';
// import LogoComponent from './components/LogoComponent';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <ProductPage />
      </div>
    </Provider>
  );
};

export default App;