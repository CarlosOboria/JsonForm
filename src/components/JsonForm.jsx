import schema from "./schema.json";
import uischema from "./uischema.json";
import { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import Button from "@mui/material/Button";

const initialData = {
  name: "Mr/Mrs Oboria",
  responsable: true,
  irresponsable: true,
  fecha:new Date().toISOString().split('T')[0],
};


export const JsonFormsProb = () => {
  const [data, setData] = useState(initialData);

  const handleSubmit = () => {
    const jsonData = JSON.stringify(data, null, 2);
    console.log('Datos del formulario en JSON:', jsonData);
  };

  return (
    <div>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data || {}}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />
      <Button
        onClick={handleSubmit}
        color="primary"
        variant="contained"
        data-testid="clear-data"
      >
        Salvameeeeh!!
      </Button>

      <Button onClick={() => setData({})} color="primary">
        Clear form data
      </Button>
    </div>
  );
};
export default JsonForms;
