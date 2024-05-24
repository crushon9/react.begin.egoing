import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App_tag from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); // id가 root인 요소
root.render(
  <React.StrictMode>
    <App_tag />
  </React.StrictMode>
);

/** If you want to start measuring performance in your app, pass a function
 to log results (for example: reportWebVitals(console.log))
 or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals */
reportWebVitals();