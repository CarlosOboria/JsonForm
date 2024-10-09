import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

const msalConfig = {
    auth: {
      clientId: "8aa993c8-a3bf-4347-9e30-89e412d7030e",
      authority: "https://login.microsoftonline.com/970111b7-dfe6-4e9e-ab32-e335c6a60e65",
      redirectUri:"https://carlosoboria.github.io/JsonForm/"
    },
    system: {
        allowNativeBroker: true,
    }
}

const msalInstance  = new PublicClientApplication(msalConfig);

async function initializeApp() {
  try {
      // Esperamos a que se inicialice MSAL
      await msalInstance.initialize();
      
      // Esperamos la respuesta de handleRedirectPromise
      await msalInstance.handleRedirectPromise();
      
      // Una vez inicializado MSAL, renderizamos la aplicación
      createRoot(document.getElementById('root')).render(
          <StrictMode>
              <MsalProvider instance={msalInstance}>
                  <App />
              </MsalProvider>
          </StrictMode>
      );
  } catch (error) {
      console.error("Error during MSAL initialization", error);
  }
}
// Llamamos a la función de inicialización
initializeApp();
