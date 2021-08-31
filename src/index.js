import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './_helper/store';
import App from './App';
import axios from "axios";
import { config } from './config/config';

//axios.defaults.baseURL = "http://localhost:19191/api";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App cloudName={config.cloudinaryConfig.cloud_name} uploadPreset={config.cloudinaryConfig.upload_preset}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

