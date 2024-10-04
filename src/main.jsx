import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

const config = {
    auth: {
      clientId: "8aa993c8-a3bf-4347-9e30-89e412d7030e",
      authority: "https://login.microsoftonline.com/970111b7-dfe6-4e9e-ab32-e335c6a60e65",
      redirectUri:"https://carlosoboria.github.io/JsonForm/"
    },
    system: {
        allowNativeBroker: true,
    }
};


const publicClientApplication = new PublicClientApplication(config);

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <MsalProvider instance={publicClientApplication}>
            <App />
        </ MsalProvider>
  </StrictMode>,
)
