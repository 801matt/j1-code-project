import EmailForm from "./components/EmailForm";
import DataTable from "./components/DataTable";
import { useState } from "react";

function App() {
  const [tableData, setTableData] = useState([]);

  const handleFormSubmit = (e) => {
    fetch(`http://localhost:4000/breaches/${e}`)
      .then((res) => res.json())
      .then((data) => setTableData(data));
  };

  const handleClearData = () => {
    setTableData([]);
  };

  return (
    <InternalUseWrapper>
      <EmailForm
        handleFormSubmit={(e) => handleFormSubmit(e)}
        clearData={handleClearData}
      />
      <DataTable queryData={tableData} clearData={handleClearData} />
    </InternalUseWrapper>
  );
}

export default App;
