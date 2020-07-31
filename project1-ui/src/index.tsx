import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



ReactDOM.render(
  <React.StrictMode>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDGhTQaovZ1_vQSuDqmqZwEVq6Nxat9u8U&libraries=places"></script>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();