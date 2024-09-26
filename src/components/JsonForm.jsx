import schema from "./schema.json";
import uischema from "./uischema.json";
import { useState, useMemo } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import Button from "@mui/material/Button";
import axios from "axios";

const initialData = {
  name: "Mr/Mrs Oboria",
  responsable: true,
  irresponsable: false,
  fecha: new Date().toISOString().split("T")[0],
};

export const JsonFormsProb = () => {
  const [data, setData] = useState(initialData);
  const jsonData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const handleSubmit = () => {
    // #BlobRegion
    const dataBlob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    setData(url); // Guardar la URL generada
    console.log(url);
    window.open(url, "_blank");
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
        setData(response.jsonData);
        console.log(response.jsonData); // Ver la respuesta en consola
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return (
      <div>
        <button>Hacer POST</button>
      </div>
    );
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
          Salvameeeeh!!
        </Button>
        <Button
          onClick={() => setData({})}
          color="secondary"
          variant="contained"
        >
          Clear form data
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
