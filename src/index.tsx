import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
// import booksProvider
import BookProvider from './context/BookContext';
// import categoriesProvider
import CategoryProvider from './context/CategoryContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <CategoryProvider>
    <BookProvider>
      <React.StrictMode>
      <App />
    </React.StrictMode>
    </BookProvider>
  </CategoryProvider>
  
);


