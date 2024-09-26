import schema from "./schema.json";
import uischema from "./uischema.json";
import { useState, useMemo } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import Button from "@mui/material/Button";

const initialData = {
  name: "Mr/Mrs Oboria",
  responsable: true,
  irresponsable: false,
  fecha:new Date().toISOString().split('T')[0],
};


export const JsonFormsProb = () => {
  const [data, setData] = useState(initialData);
  const jsonData =useMemo(()=>JSON.stringify(data, null, 2),[data]) ;
  const [jsonUrl, setJsonUrl] = useState('');
  
  const handleSubmit = () => {  
    console.log(jsonData);
     // Crear una data URL para el JSON
     const dataBlob = new Blob([jsonData], { type: 'application/json' });
     const url = URL.createObjectURL(dataBlob);
 
     setJsonUrl(url);  // Guardar la URL generada
     console.log(url)
     window.open(url, '_blank');
    
    setData({})
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
        sx={{ marginRight: 3 }}   >
        Salvameeeeh!!
      </Button>

      <Button onClick={() => setData({})} color="secondary" variant="contained">
        Clear form data
      </Button>
      </div>
      </>
  );
};
export default JsonForms;
