import React, { useState, useEffect } from "react";

const ChatUI = () => {
  const [models, setModels] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [enteredModel, setEnteredModel] = useState(""); // User-entered model name
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/models/getmodels")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched models:", data); // ✅ Debugging log
        setModels(data || []);

        const uniqueProviders = [
          ...new Set(data.map((model) => model.split("/")[0])),
        ];
        console.log("Unique Providers:", uniqueProviders); // ✅ Debugging log
        setProviders(uniqueProviders);
      })
      .catch((err) => console.error("Error fetching models:", err));
  }, []);

  const handleSend = async () => {
    if (!selectedProvider || !enteredModel || !prompt) {
      alert("Please select a provider, enter a model, and provide a prompt.");
      return;
    }
  
    // Ensure we send only the model name (without provider prefix)
    const formattedModel = enteredModel.includes("/") ? enteredModel.split("/")[1] : enteredModel;
  
    const requestBody = { provider: selectedProvider, model: formattedModel, prompt };
  
    console.log("Sending Request:", requestBody); // ✅ Debugging log
  
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
      console.log("API Response:", data); // ✅ Debugging log
  
      if (!data || !data.response) {
        setResponse("Error: Empty response from API");
      } else {
        setResponse(data.response);
      }
    } catch (error) {
      console.error("Error sending request:", error);
      setResponse(`Error: ${error.message}`);
    }
  };
  

  return (
    <div className="chat-container">
      <h2>Simple Chat UI</h2>
      <div>
        <label>Provider:</label>
        <select
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
        >
          <option value="">Select Provider</option>
          {providers.map((provider) => (
            <option key={provider} value={provider}>
              {provider}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Enter Model:</label>
        <input
          type="text"
          value={enteredModel}
          onChange={(e) => setEnteredModel(e.target.value)}
          placeholder="Enter model name (e.g., gpt-3.5)"
        />
      </div>
      <div>
        <label>Enter Prompt:</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
        />
      </div>
      <button onClick={handleSend}>Send</button>
      <div className="response-box">
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default ChatUI;
