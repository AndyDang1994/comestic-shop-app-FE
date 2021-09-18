import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import store from './_helper/store';
import { persistor } from './_helper/store';
import App from './App';
import axios from "axios";
import { config } from './config/config';

//axios.defaults.baseURL = "http://localhost:19191/api";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate  persistor={persistor}  loading={null}>
        <App cloudName={config.cloudinaryConfig.cloud_name} uploadPreset={config.cloudinaryConfig.upload_preset}/>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

