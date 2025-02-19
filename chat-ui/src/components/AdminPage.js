import React, { useState } from "react";

function AdminPage({ onExitAdmin }) {
  const [regexRules, setRegexRules] = useState([]);
  const [newRule, setNewRule] = useState("");

  const handleAddRule = () => {
    if (newRule.trim()) {
      setRegexRules([...regexRules, newRule.trim()]);
      setNewRule("");
    }
  };

  const handleDeleteRule = (index) => {
    setRegexRules(regexRules.filter((_, i) => i !== index));
  };

  const handleEditRule = (index, updatedRule) => {
    setRegexRules(regexRules.map((rule, i) => (i === index ? updatedRule : rule)));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Admin Page</h1>
      <button style={styles.button} onClick={onExitAdmin}>Back to User Page</button>

      <div style={styles.formGroup}>
        <h2 style={styles.responseHeader}>Add New Regex Rule</h2>
        <input
          type="text"
          value={newRule}
          onChange={(e) => setNewRule(e.target.value)}
          placeholder="Enter new regex rule"
          style={styles.input}
        />
        <button style={styles.button} onClick={handleAddRule}>Add Rule</button>
      </div>

      <h2 style={styles.responseHeader}>Existing Regex Rules</h2>
      {regexRules.length > 0 ? (
        <ul>
          {regexRules.map((rule, index) => (
            <li key={index} style={styles.responseBox}>
              <input
                type="text"
                value={rule}
                onChange={(e) => handleEditRule(index, e.target.value)}
                style={styles.input}
              />
              <button style={styles.button} onClick={() => handleDeleteRule(index)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.responseText}>No regex rules added yet.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    textAlign: 'center',
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
    fontWeight: 'bold'
  },
  formGroup: {
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    color: '#333',
    marginBottom: '10px'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase'
  },
  responseBox: {
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
    marginBottom: '10px'
  },
  responseHeader: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333'
  },
  responseText: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#444'
  }
};

export default AdminPage;