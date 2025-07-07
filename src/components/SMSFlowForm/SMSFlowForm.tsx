import React, { useState } from "react";
import "./smsFlowForm.css"; // Import the CSS file
import formImage from "../../assets/LifesaversHand.png"; // Import the image

type FormData = {
  application_id: string;
  capture_language: "en-us" | "fr-ca" | "es-mx";
  document_type: "na_dl" | "passport" | "other";
  phone_number: string;
  signals: string[];
};

type SignalOption = {
  value: string;
  label: string;
};

const BASE_URL = import.meta.env.VITE_BASE_URL;
const SMS_END_POINT = import.meta.env.VITE_SMS_END_POINT;

const SMSFlowForm = () => {
  const [formData, setFormData] = useState<FormData>({
    application_id: "",
    capture_language: "en-us",
    document_type: "na_dl",
    phone_number: "",
    signals: [],
  });

  const [success, setSuccess] = useState<boolean>(false);

  const signalsList: SignalOption[] = [
    { value: "selfie", label: "Selfie" },
    { value: "idcheck", label: "Barcode" },
    { value: "ocr_scan", label: "OCR" },
    { value: "document_liveness_idrnd", label: "Document Liveness" },
    { value: "ocr_match", label: "OCR & Barcode Match" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}${SMS_END_POINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
        }, 9000);

        setFormData({
          application_id: "",
          capture_language: "en-us",
          document_type: "na_dl",
          phone_number: "",
          signals: [],
        });
      } else {
        alert("Submission failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  };

  return (
    <>
      <div className="SMSFlowFormContainer" style={{ marginTop: "20px" }}>
        <div className="SMSFlowForm__img">
          {success ? <h1>✔️</h1> : <img src={formImage} alt="IMG" />}
        </div>
        {success ? (
          <h2 className="form-success-message">
            <span className="form-success-message__span-one">
              {" "}
              Form Complete successfully!
            </span>
            <span className="form-success-message__span-two">
              Check your Phone to start the process
            </span>
          </h2>
        ) : (
          <form className="SMSFlowForm" onSubmit={handleSubmit}>
            <h2 className="form-heading">📱Submit SMS Flow</h2>

            <label className="form-label">
              Application ID
              <input
                type="text"
                name="application_id"
                value={formData.application_id}
                onChange={handleChange}
                className="form-input"
                required
              />
            </label>

            <label className="form-label">
              Language
              <select
                name="capture_language"
                value={formData.capture_language}
                onChange={handleChange}
                className="form-select"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
              </select>
            </label>

            <label className="form-label">
              Document Type
              <select
                name="document_type"
                value={formData.document_type}
                onChange={handleChange}
                className="form-select"
              >
                <option value="north_america_dl">
                  North America Driver's License
                </option>
                <option value="passport_booklet">Passport Booklet</option>
                <option value="other_documents">Other Documents</option>
              </select>
            </label>

            <label className="form-label">
              Phone Number
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="form-input"
                required
              />
            </label>

            <fieldset className="form-fieldset">
              <legend className="form-checkbox-label">Signals</legend>
              {signalsList.map(({ value, label }) => (
                <label key={value} className="form-checkbox-label">
                  <input
                    type="checkbox"
                    name="signals"
                    value={value}
                    checked={formData.signals.includes(value)}
                    onChange={(e) => {
                      const { checked, value } = e.target;
                      setFormData((prev) => ({
                        ...prev,
                        signals: checked
                          ? [...prev.signals, value]
                          : prev.signals.filter((s) => s !== value),
                      }));
                    }}
                    className="form-checkbox"
                  />
                  {label}
                </label>
              ))}
            </fieldset>
            <button type="submit" className="form-button">
              Start Capture
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default SMSFlowForm;
