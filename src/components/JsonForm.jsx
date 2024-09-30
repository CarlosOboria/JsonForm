import schema from "./schema.json";
import uischema from "./uischema.json";
import { useState} from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import Button from "@mui/material/Button";
import axios from "axios";

const initialData = {
  emilio: "Mr/Mrs Oboria@oboria.com",
  responsable: false
 
};

export const JsonFormsProb = () => {
  const [data, setData] = useState(initialData);

  const handleSubmit = () => {
    
    const jsonData = JSON.stringify(data, null, 2);
    console.log("Datos a enviar:", jsonData);
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
        console.log(response.data); // Ver la respuesta en consola
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
          onChange={({ data }) => setData(data)}
        />
      </div>
      <div>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          sx={{ marginRight: 3 }}
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
