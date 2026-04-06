import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const testAPI = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const res = await axios.post("http://localhost:5000/check-api", {
        url,
        method,
      });

      setResult(res.data);

      const newItem = {
        url,
        status: res.data.status,
        time: res.data.time,
        success: res.data.success,
      };

      setHistory([newItem, ...history]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div style={{ background: "#020617", minHeight: "100vh", color: "white", padding: "30px", fontFamily: "Arial" }}>
    
    <div style={{ maxWidth: "900px", margin: "auto" }}>

      {/* HEADER */}
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
        🚀 API Health Dashboard
      </h1>
      <p style={{ color: "#94a3b8", marginBottom: "25px" }}>
        Monitor API performance and debug endpoints
      </p>
      {/* INPUT CARD */}
      <div style={{
        background: "#0f172a",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #1e293b"
      }}>
        
        <input
          type="text"
          placeholder="Enter API URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: "55%",
            padding: "12px",
            marginRight: "10px",
            borderRadius: "8px",
            border: "1px solid #334155",
            background: "#020617",
            color: "white"
          }}
        />

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={{
            padding: "12px",
            marginRight: "10px",
            borderRadius: "8px",
            background: "#020617",
            color: "white",
            border: "1px solid #334155"
          }}
        >
          <option>GET</option>
          <option>POST</option>
        </select>

        <button
          onClick={testAPI}
          style={{
            padding: "12px 18px",
            background: "#2563eb",
            borderRadius: "8px",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          {isLoading ? "Testing..." : "Test API"}
        </button>
      </div>

      {/* RESULT CARD */}
      {result && (
        <div style={{
          marginTop: "25px",
          background: "#0f172a",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #1e293b"
        }}>

          {/* STATUS BADGE */}
          <div style={{ marginBottom: "10px" }}>
            <span style={{
              padding: "6px 12px",
              borderRadius: "20px",
              background: result.success ? "#16a34a" : "#dc2626",
              color: "white",
              fontWeight: "bold"
            }}>
              {result.success ? "SUCCESS" : "FAILED"} ({result.status})
            </span>
            <div style={{ position: "relative" }}>
  
  <button
    onClick={() => navigator.clipboard.writeText(JSON.stringify(result.data, null, 2))}
    style={{
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "#334155",
      color: "white",
      border: "none",
      padding: "5px 10px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "12px"
    }}
  >
    Copy
  </button>

  <pre style={{
    background: "#020617",
    padding: "15px",
    borderRadius: "8px",
    maxHeight: "300px",
    overflow: "auto",
    fontSize: "13px"
  }}>
    {JSON.stringify(result.data, null, 2)}
  </pre>

</div>

          </div>

          {/* RESPONSE TIME */}
          <p style={{ color: "#94a3b8", marginBottom: "10px" }}>
            ⏱ Response Time: <strong style={{ color: "white" }}>{result.time} ms</strong>
          </p>

          {/* DATA / ERROR */}
          {result.success ? (
            <pre style={{
              background: "#020617",
              padding: "15px",
              borderRadius: "8px",
              maxHeight: "300px",
              overflow: "auto",
              fontSize: "13px"
            }}>
              {JSON.stringify(result.data, null, 2)}
            </pre>
          ) : (
            <p style={{ color: "#f87171" }}>
              ❌ Error: {result.error}
            </p>
          )}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <h3>🕘 Request History</h3>

  <button
    onClick={() => setHistory([])}
    style={{
      background: "#dc2626",
      border: "none",
      padding: "5px 10px",
      borderRadius: "5px",
      color: "white",
      cursor: "pointer"
    }}
  >
    Clear
  </button>
</div>
      {/* HISTORY */}
      {history.length > 0 && (
        <div style={{ marginTop: "25px" }}>
          <h3 style={{ marginBottom: "10px" }}>🕘 Request History</h3>

          {history.map((item, i) => (
            <div
              key={i}
              onClick={() => {
              setUrl(item.url);
              testAPI();
  }}
              style={{
                 background: "#0f172a",
                 padding: "12px",
                 marginBottom: "10px",
                 borderRadius: "8px",
                 border: "1px solid #1e293b",
                 cursor: "pointer"
              }}
            >
              <div style={{ fontSize: "14px", marginBottom: "5px" }}>
                {item.url}
              </div>

              <span style={{
                padding: "4px 10px",
                borderRadius: "20px",
                background: item.success ? "#16a34a" : "#dc2626",
                fontSize: "12px",
                fontWeight: "bold"
              }}>
                {item.status}
              </span>

              <span style={{ marginLeft: "10px", color: "#94a3b8" }}>
                {item.time} ms
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
     <div style={{
  marginTop: "40px",
  textAlign: "center",
  color: "#64748b",
  fontSize: "13px"
}}>
  © 2026 API Health Dashboard · Built by 
  <span style={{ color: "#f8fafb", marginLeft: "5px" }}>
    Pranjali Srivastava
  </span>
</div>
  </div>
);
}

export default App;