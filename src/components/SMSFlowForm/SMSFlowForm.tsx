import React, { useState } from "react";
import "./smsFlowForm.css"; // Import the CSS file
import formImage from "../../assets/LifesaversHand.png"; // Import the image
type FormData = {
  applicationId: string;
  language: "en_us" | "es_mx" | "fr_ca";
  documentType: "na_dl" | "passport" | "other";
  phoneNumber: string;
  signals: string[];
};

type SignalOption = {
  value: string;
  label: string;
};

const SMSFlowForm = () => {
  const [formData, setFormData] = useState<FormData>({
    applicationId: "",
    language: "en_us",
    documentType: "na_dl",
    phoneNumber: "",
    signals: [],
  });

  const signalsList: SignalOption[] = [
    { value: "selfie", label: "Selfie" },
    { value: "barcode", label: "Barcode" },
    { value: "ocr", label: "OCR" },
    { value: "document_liveness", label: "Document Liveness" },
    { value: "ocr_barcode_match", label: "OCR & Barcode Match" },
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
      const res = await fetch("/api/submit-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Form submitted successfully");
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
          <img src={formImage} alt="IMG" />
        </div>
        <form className="SMSFlowForm" onSubmit={handleSubmit}>
          <h2 className="form-heading">📱Submit SMS Flow</h2>

          <label className="form-label">
            Application ID
            <input
              type="text"
              name="applicationId"
              value={formData.applicationId}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>

          <label className="form-label">
            Language
            <select
              name="language"
              value={formData.language}
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
              name="documentType"
              value={formData.documentType}
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
              name="phoneNumber"
              value={formData.phoneNumber}
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
      </div>
    </>
  );
};

export default SMSFlowForm;
