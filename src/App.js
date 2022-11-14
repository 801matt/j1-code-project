import EmailForm from "./components/EmailForm";
import DataTable from "./components/DataTable";
import { useState } from "react";

function App() {
  const [tableData, setTableData] = useState([]);

  const handleFormSubmit = (e) => {
    fetch(`https://j1-code-project--backend.herokuapp.com/breaches/${e}`)
      .then((res) => res.json())
      .then((data) => setTableData(data));
  };

  const handleClearData = () => {
    setTableData([]);
  };

  return (
    <>
      <EmailForm
        handleFormSubmit={(e) => handleFormSubmit(e)}
        clearData={handleClearData}
      />
      <DataTable queryData={tableData} clearData={handleClearData} />
    </>
  );
}

export default App;
