import React from "react";

const SelectionPage = ({ onSelect }) => {
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "50px auto",
      padding: "20px",
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      fontFamily: "Arial, sans-serif"
    },
    button: {
      width: "100%",
      padding: "14px",
      margin: "10px 0",
      backgroundColor: "#000",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textTransform: "uppercase",
      letterSpacing: "0.5px"
    }
  };

  return (
    <div style={styles.container}>
      <h2>Choose Your Role</h2>
      <button style={styles.button} onClick={() => onSelect("User")}>
        User
      </button>
      <button style={styles.button} onClick={() => onSelect("Admin")}>
        Admin
      </button>
    </div>
  );
};

export default SelectionPage;
