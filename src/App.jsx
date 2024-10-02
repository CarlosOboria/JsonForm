import './App.css'
import { JsonFormsProb }  from './components/JsonForm'
import { InteractionType } from "@azure/msal-browser";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";

function WelcomeUser() {
  const { accounts } = useMsal();
  const username = accounts[0].username;

  return <p>Welcome, {username}</p>;
}

function App() {
  return (
    <MsalAuthenticationTemplate interactionType={InteractionType.Popup}>
    <p>This will only render if a user is not signed-in.</p>
    <WelcomeUser />
  </MsalAuthenticationTemplate>
  )
}

export default App

/* 
<div>
<h1>Formulario JeiSON</h1>
<h3>para Oboria S.L.</h3>

<JsonFormsProb/>
</div> */