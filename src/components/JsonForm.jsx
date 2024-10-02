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
const email = urlParams.get("email");
const idArchivo = urlParams.get("idArchivo");

const initialData = {
  emilio: email,
  id: idArchivo,
  responsable: false,
  registro: {
    cambio: "",
    comentario: "",
  },
};

export const JsonFormsProb = () => {
  const [data, setData] = useState(initialData);
  const [isValid, setIsValid] = useState(false); // Estado para habilitar o deshabilitar el botón
  // Estado para controlar si el formulario ha sido enviado
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Función para manejar los cambios en el formulario
  const handleChange = ({ data }) => {
    setData(data);
    // Verifica si los campos "cambio" y "comentario" están completos
    const isCambioFilled = data?.registro?.cambio?.trim() !== "";
    const isComentarioFilled = data?.registro?.comentario?.trim() !== "";
    // Actualiza el estado de validez si ambos campos están llenos
    setIsValid(isCambioFilled && isComentarioFilled);
  };

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
        console.log("Datos enviados exitosamente:", response.data);
        setIsSubmitted(true);
      const timer = setTimeout(() => {
        window.close();
      }, 1000);
      return () => clearTimeout(timer);
      })
      .catch((error) => {
        console.error("Error enviando los datos a Power Automate:", error);
      });
    setIsSubmitted(true);
  };

  return (
    <>
      {!isSubmitted ? (
        <div>
          <JsonForms
            schema={schema}
            uischema={uischema}
            data={data || {}}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={handleChange}
          />
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
        </div>
      ) : ( 
        <div>
          <h2 style={{ color: 'blue' }}>Formulario enviado</h2>
          <h3 style={{ color: 'blue' }}>Graaaacias!</h3>
        </div>
        
        
      )}
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
