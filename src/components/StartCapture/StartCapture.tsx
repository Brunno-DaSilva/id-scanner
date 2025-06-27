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
type StartCaptureProps = {
  fetchURL: string;
  btnTitle: string;
  iFrame: boolean;
};

const StartCapture: React.FC<StartCaptureProps> = ({
  fetchURL,
  btnTitle,
  iFrame = null,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [captureUrl, setCaptureUrl] = useState<string | null>(null);
  const [phone, setPhone] = useState("");

  const handleStart = async () => {
    setLoading(true);
    setError(null);
    setCaptureUrl(null);

    if (!iFrame) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/send-capture-sms",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone_number: phone,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to send capture link");
        }

        alert("Capture link sent to phone!");
      } catch (err) {
        const typedError = err as Error;
        setError(typedError.message);
      } finally {
        setLoading(false);
      }

      return;
    }

    try {
      const response = await fetch(`${fetchURL}`, {
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
        {loading ? "Starting..." : `${btnTitle}`}
      </Button>

      {error && <p style={{ color: "tomato" }}>Error: {error}</p>}

      {captureUrl && iFrame ? (
        <div style={{ marginTop: "20px" }}>
          <h3>Capture iframe Flow</h3>
          <iframe
            src={captureUrl}
            title="Intellicheck Capture"
            width="900"
            height="900"
            allow="camera; microphone"
          />
        </div>
      ) : captureUrl && !iFrame ? (
        // Show phone form if captureUrl exists but iFrame is false
        <div style={{ marginTop: "20px" }}>
          <h3>Send Capture Link</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const phoneNumber = formData.get("phone") as string;
              setPhone(phoneNumber);
              console.log("Send capture link to:", phoneNumber);
              // TODO: handle sending logic here
            }}
          >
            <label htmlFor="phone">Phone Number:</label>
            <br />
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              placeholder="e.g. +1 (888) 888-8888"
            />
            <br />
            <br />
            <button type="submit" style={{ padding: "0.5rem 1rem" }}>
              Send Link
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default StartCapture;
