import React, { useState } from "react";
import "./smsFlowForm.css"; // Import the CSS file
import formImage from "../../assets/LifesaversHand.png"; // Import the image
type FormData = {
  applicationId: string;
  language: "english" | "spanish" | "french";
  documentType: "north_america_dl" | "passport_booklet" | "other_documents";
  phoneNumber: string;
  selfieRequired: boolean;
};

const SMSFlowForm = () => {
  const [formData, setFormData] = useState<FormData>({
    applicationId: "",
    language: "english",
    documentType: "north_america_dl",
    phoneNumber: "",
    selfieRequired: false,
  });

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

          <label className="form-checkbox-label">
            <input
              type="checkbox"
              name="selfieRequired"
              checked={formData.selfieRequired}
              onChange={handleChange}
              className="form-checkbox"
            />
            Selfie Required
          </label>
        </form>
      </div>
    </>
  );
};

export default SMSFlowForm;
