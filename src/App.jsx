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

function App() {
  const { instance } = useMsal();

  useEffect(() => {
    const login = async () => {
      try {
        await instance.loginPopup({
          scopes: ["User.Read"]
        });
      } catch (error) {
        console.error("Error durante el inicio de sesión: ", error);
      }
    };

    login();
  }, [instance]);

  return (
    <div>
      <MsalAuthenticationTemplate interactionType={InteractionType.Popup}>
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