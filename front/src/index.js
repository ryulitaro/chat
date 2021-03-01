import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './index.css';
import App from './App';
import websocketConn from './websocket'

console.log('Create websocket connection ...')
const websocket = new websocketConn();
console.log('Create websocket connection Success!')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

export default websocket;