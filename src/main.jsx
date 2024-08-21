import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from './store/store.js';
import { Toaster } from 'react-hot-toast';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en.json';

TimeAgo.addDefaultLocale(en);

export const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster
          position="top-center"
          containerStyle={{
            top: 80,
            zIndex: 9999999999999,
          }}
        />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
