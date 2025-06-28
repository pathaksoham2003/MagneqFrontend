import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import { ThemeProvider } from './context/ThemeContext.jsx';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import  store ,{ persistor } from "./store/store.js";
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </BrowserRouter>
  </StrictMode>
);