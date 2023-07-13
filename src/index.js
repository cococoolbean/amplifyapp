import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

Amplify.configure({
  API: {
    endpoints: [
      {
        name: "multiplier", // you'll use this name to send requests to the API
        endpoint: "https://4b39guzzz0.execute-api.ap-southeast-1.amazonaws.com/dev", // replace with your actual API Gateway endpoint
        region: "ap-southeast-1" // replace with your actual region
      }
    ]
  }
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
