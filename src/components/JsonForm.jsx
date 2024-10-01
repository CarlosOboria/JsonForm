import schema from "./schema.json";
import uischema from "./uischema.json";
import { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import Button from "@mui/material/Button";
import axios from "axios";

const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
console.log('email es :', email)
const mail = email;
const initialData = {
  emilio: mail ,
  responsable: false,
  registro: {
    // Asegúrate de incluir los campos iniciales
    cambio: "",
    comentario: "",
  },
};

export const JsonFormsProb = () => {
  const [data, setData] = useState(initialData);
  // #ValidRegion-chatgpt
  const [isValid, setIsValid] = useState(false); // Estado para habilitar o deshabilitar el botón

  // Función para manejar los cambios en el formulario
  const handleChange = ({ data }) => {
    setData(data);

    // Verifica si los campos "cambio" y "comentario" están completos
    const isCambioFilled = data?.registro?.cambio?.trim() !== "";
    const isComentarioFilled = data?.registro?.comentario?.trim() !== "";
    /* 
    console.log('Cambio lleno:', isCambioFilled);
    console.log('Comentario lleno:', isComentarioFilled);
    console.log('Es válido:', isValid);
    */
    // Actualiza el estado de validez si ambos campos están llenos
    setIsValid(isCambioFilled && isComentarioFilled);
  };
  //End ValidRegion-chatgpt

  const handleSubmit = () => {
    const jsonData = JSON.stringify(data, null, 2);
    // #BlobRegion
    /*   const dataBlob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    window.open(url, "_blank"); */
    // #endRegion
    const urlPower =
      "https://prod-93.westeurope.logic.azure.com:443/workflows/82828cccadf346ef9f870a0cc40cca1f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=AMDsphYZcS3quqkcVzaub3Y6hzJZylJumA4dfUHFVrA";

    // Añadimos el header para que llegue en formato Json en Power Autoamte
    axios
      .post(urlPower, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error enviando los datos a Power Automate:", error);
      });
  };
  return (
    <>
      <div>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data || {}}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={handleChange} // Aquí usamos la función que valida los campos #ValidRegion
        />
      </div>
      <div>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          sx={{ marginRight: 3 }}
          disabled={!isValid} // Deshabilita el botón si los campos no están completos
        >
          Enviar
        </Button>
        <Button
          onClick={() => setData({})}
          color="secondary"
          variant="contained"
        >
          Dejarlo limpito
        </Button>
      </div>
    </>
  );
};

export default JsonForms;

/* Blob:   const dataBlob = new Blob([jsonData], { type: 'application/json' });
const url = URL.createObjectURL(dataBlob);
setJsonUrl(url);  // Guardar la URL generada
console.log(url)
window.open(url, '_blank');

Esto muestra la respuesta:
 {jsonData && <div>Respuesta: {JSON.stringify(jsonData)} </div>}

*/
