import React, { useState } from "react";
import ChatUI from "./components/ChatUI";
import SelectionPage from "./components/SelectionPage";
import AdminPage from "./components/AdminPage";
import "./styles.css";

function App() {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="App">
      {selectedRole === "Admin" ? (
        <AdminPage onExitAdmin={() => setSelectedRole(null)} />
      ) : selectedRole ? (
        <>
          <h1>{selectedRole} - AI Chat Interface</h1>
          <ChatUI />
        </>
      ) : (
        <SelectionPage onSelect={handleRoleSelection} />
      )}
    </div>
  );
}

export default App;
