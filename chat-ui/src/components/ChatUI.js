import React, { useState, useEffect } from "react";

const ChatUI = () => {
  const [models, setModels] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [enteredModel, setEnteredModel] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const styles = {
    container: {
      maxWidth: '800px',
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
      marginBottom: '30px',
      fontWeight: 'bold'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      color: '#444',
      fontSize: '14px',
      fontWeight: '600'
    },
    select: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      backgroundColor: '#fff',
      fontSize: '14px',
      color: '#333'
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '14px',
      color: '#333'
    },
    textarea: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      minHeight: '120px',
      fontSize: '14px',
      color: '#333',
      resize: 'vertical'
    },
    button: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    fileUpload: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px'
    },
    fileLink: {
      color: '#000',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '600'
    },
    responseBox: {
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e9ecef'
    },
    responseHeader: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '12px',
      color: '#333'
    },
    responseText: {
      fontSize: '14px',
      lineHeight: '1.6',
      color: '#444',
      whiteSpace: 'pre-wrap'
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/models/getmodels")
      .then((res) => res.json())
      .then((data) => {
        setModels(data || []);
        const uniqueProviders = [...new Set(data.map((model) => model.split("/")[0]))];
        setProviders(uniqueProviders);
      })
      .catch((err) => console.error("Error fetching models:", err));
  }, []);

  const handleSend = async () => {
    if (!selectedProvider || !enteredModel || !prompt) {
      alert("Please select a provider, enter a model, and provide a prompt.");
      return;
    }

    setIsLoading(true);
    const formattedModel = enteredModel.includes("/") ? enteredModel.split("/")[1] : enteredModel;
    const requestBody = { provider: selectedProvider, model: formattedModel, prompt, fileUrl };

    try {
      const res = await fetch("http://localhost:5000/api/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response || "Error: Empty response from API");
    } catch (error) {
      console.error("Error sending request:", error);
      setResponse(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setSelectedFile(file);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/upload/uploadfile", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Upload failed! Status: ${res.status}`);
      }

      const data = await res.json();
      setFileUrl(data.fileUrl);
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>AI Chat Interface</h2>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Provider:</label>
        <select 
          style={styles.select}
          value={selectedProvider} 
          onChange={(e) => setSelectedProvider(e.target.value)}
        >
          <option value="">Select Provider</option>
          {providers.map((provider) => (
            <option key={provider} value={provider}>{provider}</option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Model:</label>
        <input
          type="text"
          style={styles.input}
          value={enteredModel}
          onChange={(e) => setEnteredModel(e.target.value)}
          placeholder="Enter model name (e.g., gpt-3.5)"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Prompt:</label>
        <textarea
          style={styles.textarea}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Upload File:</label>
        <input
          type="file"
          onChange={handleFileUpload}
          style={styles.fileUpload}
        />
        {fileUrl && (
          <a 
            href={fileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.fileLink}
          >
            View Uploaded File
          </a>
        )}
      </div>

      <button
        onClick={handleSend}
        style={{
          ...styles.button,
          ...(isLoading ? { opacity: 0.7, cursor: 'not-allowed' } : {})
        }}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Send Message'}
      </button>

      {response && (
        <div style={styles.responseBox}>
          <h3 style={styles.responseHeader}>Response:</h3>
          <p style={styles.responseText}>{response}</p>
        </div>
      )}
    </div>
  );
};

export default ChatUI;
