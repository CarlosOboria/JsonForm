import './App.css'
import { JsonFormsProb }  from './components/JsonForm'
import { InteractionType } from "@azure/msal-browser";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { useEffect } from 'react';

/* function WelcomeUser() {
  const { accounts } = useMsal();
  const username = accounts[0]?.username;

  return <p>Welcome, {username}</p>;
} */
  const AZURE_FUNCTION_SCOPE = ["api://e137baf1-a1ab-438a-9e64-4d41b1ab3f52/.default"];
  //const FLOW_SCOPE = ["https://service.flow.microsoft.com//.default"];
  

  function App() {
    return (
      <div>
        <MsalAuthenticationTemplate 
          interactionType={InteractionType.Redirect} 
          authenticationRequest={{ scopes: AZURE_FUNCTION_SCOPE }}
        >
          <p>Este contenido solo se mostrará si el usuario no está autenticado.</p>
          <JsonFormsProb />
        </MsalAuthenticationTemplate>
      </div>
    );
  }
export default App

/* 
<div>
<h1>Formulario JeiSON</h1>
<h3>para Oboria S.L.</h3>

<JsonFormsProb/>
</div> */