import React, { useState } from "react";
import { Button } from "../Button/Button";
import "./startCapture.css";
// Define the expected shape of the API response
interface CaptureResponse {
  private_data?: {
    capture_url?: string;
    transaction_id?: string;
  };
}
const StartCapture: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [captureUrl, setCaptureUrl] = useState<string | null>(null);

  const handleStart = async () => {
    setLoading(true);
    setError(null);
    setCaptureUrl(null);

    try {
      const response = await fetch("http://localhost:5000/api/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data: CaptureResponse = await response.json();
      const captureUrl = data?.private_data?.capture_url;

      if (!captureUrl) {
        throw new Error("Missing capture_url in API response.");
      }

      setCaptureUrl(captureUrl);
    } catch (err) {
      const typedError = err as Error;
      setError(typedError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="startCapture">
      <Button onClick={handleStart} disabled={loading}>
        {loading ? "Starting..." : "Start Capture"}
      </Button>

      {error && <p style={{ color: "tomato" }}>Error: {error}</p>}

      {captureUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>Capture Flow</h3>
          <iframe
            src={captureUrl}
            title="Intellicheck Capture"
            width="100%"
            height="600"
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
            allow="camera; microphone"
          />
        </div>
      )}
    </div>
  );
};

export default StartCapture;
