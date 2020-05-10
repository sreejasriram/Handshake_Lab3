import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import {createStore} from 'redux';
// import {Provider} from 'react-redux';
// import allReducers from './components/Reducers';
// import store from "./redux/store/index";



ReactDOM.render(
//  <Provider store={store}> 
<App />
// </Provider>
, 

document.getElementById('root'));

serviceWorker.unregister();
