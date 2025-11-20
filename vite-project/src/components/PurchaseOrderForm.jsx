import React, { useState } from "react";

export default function PurchaseOrderForm() {
  // ======= Form State =======
  const [formData, setFormData] = useState({
    clientName: "",
    poType: "",
    poNumber: "",
    receivedOn: "",
    receivedFromName: "",
    receivedFromEmail: "",
    poStartDate: "",
    poEndDate: "",
    budget: "",
    currency: "",
    reqName: "",
    selectedTalents: [],
  });

  // Dummy talents for each REQ
  const talentData = {
    "Frontend Developer": ["Mandhala sushanth", "surya", "reddy"],
    "Backend Developer": ["Praveen Rao", "Harsha Vardhan", "Neha "],
    "UI/UX Designer": ["Sara ", "Kiran ", "Devika "],
  };

  // ======= Handle Form Inputs =======
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ======= Handle Talent Checkbox =======
  const toggleTalentSelection = (talent) => {
    let updated;

    // Individual PO → Only 1 allowed
    if (formData.poType === "Individual") {
      updated = [talent];
    } else {
      // Group PO → Many allowed
      if (formData.selectedTalents.includes(talent)) {
        updated = formData.selectedTalents.filter((t) => t !== talent);
      } else {
        updated = [...formData.selectedTalents, talent];
      }
    }

    setFormData({
      ...formData,
      selectedTalents: updated,
    });
  };

  // ======= Submit Form =======
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation rules
    if (formData.poType === "Group" && formData.selectedTalents.length < 2) {
      alert("Group PO requires at least TWO talents.");
      return;
    }

    if (formData.poType === "Individual" && formData.selectedTalents.length !== 1) {
      alert("Individual PO requires EXACTLY ONE talent.");
      return;
    }

    console.log("FORM SUBMITTED:", formData);
    alert("Form Submitted Successfully!");

    setReadOnly(true);
  };

  // ======= Reset =======
  const [readOnly, setReadOnly] = useState(false);

  const resetForm = () => {
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm mt-4">
      <h2 className="mb-4">Purchase Order Details</h2>

      {/* Client Name */}
      <div className="mb-3">
        <label className="form-label">Client Name *</label>
        <select
          className="form-select"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          disabled={readOnly}
        >
          <option value="">Select Client</option>
          <option value="Client A">Client A</option>
          <option value="Client B">Client B</option>
        </select>
      </div>

      {/* PO Type */}
      <div className="mb-3">
        <label className="form-label">Purchase Order Type *</label>
        <select
          className="form-select"
          name="poType"
          value={formData.poType}
          onChange={handleChange}
          disabled={readOnly}
        >
          <option value="">Select Type</option>
          <option value="Group">Group PO</option>
          <option value="Individual">Individual PO</option>
        </select>
      </div>

      {/* PO Number */}
      <div className="mb-3">
        <label className="form-label">Purchase Order Number *</label>
        <input
          type="text"
          className="form-control"
          name="poNumber"
          value={formData.poNumber}
          onChange={handleChange}
          placeholder="Enter PO Number"
          disabled={readOnly}
        />
      </div>

      {/* Received On */}
      <div className="mb-3">
        <label className="form-label">Received On *</label>
        <input
          type="date"
          className="form-control"
          name="receivedOn"
          value={formData.receivedOn}
          onChange={handleChange}
          disabled={readOnly}
        />
      </div>

      {/* Received From Name */}
      <div className="mb-3">
        <label className="form-label">Received From (Name) *</label>
        <input
          type="text"
          className="form-control"
          name="receivedFromName"
          value={formData.receivedFromName}
          onChange={handleChange}
          disabled={readOnly}
        />
      </div>

      {/* Received From Email */}
      <div className="mb-3">
        <label className="form-label">Received From (Email) *</label>
        <input
          type="email"
          className="form-control"
          name="receivedFromEmail"
          value={formData.receivedFromEmail}
          onChange={handleChange}
          disabled={readOnly}
        />
      </div>

      {/* Start Date */}
      <div className="mb-3">
        <label className="form-label">PO Start Date *</label>
        <input
          type="date"
          className="form-control"
          name="poStartDate"
          value={formData.poStartDate}
          onChange={handleChange}
          disabled={readOnly}
        />
      </div>

      {/* End Date */}
      <div className="mb-3">
        <label className="form-label">PO End Date *</label>
        <input
          type="date"
          className="form-control"
          name="poEndDate"
          value={formData.poEndDate}
          onChange={handleChange}
          min={formData.poStartDate}
          disabled={readOnly}
        />
      </div>

      {/* Budget */}
      <div className="mb-3">
        <label className="form-label">Budget *</label>
        <input
          type="number"
          className="form-control"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          maxLength={5}
          disabled={readOnly}
        />
      </div>

      {/* Currency */}
      <div className="mb-3">
        <label className="form-label">Currency *</label>
        <select
          className="form-select"
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          disabled={readOnly}
        >
          <option value="">Select Currency</option>
          <option value="INR">INR</option>
          <option value="USD">USD</option>
        </select>
      </div>

      <hr className="my-4" />

      {/* Talent Details */}
      <h3 className="mb-3">Talent Details</h3>

      {/* REQ Name */}
      <div className="mb-3">
        <label className="form-label">Job Title / REQ Name *</label>
        <select
          className="form-select"
          name="reqName"
          value={formData.reqName}
          onChange={handleChange}
          disabled={readOnly}
        >
          <option value="">Select REQ</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="UI/UX Designer">UI/UX Designer</option>
        </select>
      </div>

      {/* REQ ID */}
      <div className="mb-3">
        <label className="form-label">REQ ID</label>
        <input
          className="form-control"
          readOnly
          value={
            formData.reqName
              ? `REQ-${formData.reqName.substring(0, 3).toUpperCase()}-001`
              : ""
          }
        />
      </div>

      {/* Talent Listing */}
      {formData.reqName && (
        <div className="mb-3">
          <label className="form-label">Select Talents *</label>

          {talentData[formData.reqName].map((talent) => (
            <div className="form-check" key={talent}>
              <input
                type="checkbox"
                className="form-check-input"
                checked={formData.selectedTalents.includes(talent)}
                onChange={() => toggleTalentSelection(talent)}
                disabled={readOnly}
              />
              <label className="form-check-label">{talent}</label>
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      {!readOnly && (
        <div className="mt-4">
          <button className="btn btn-primary me-2" type="submit">
            Save / Submit
          </button>
          <button type="button" className="btn btn-secondary" onClick={resetForm}>
            Reset
          </button>
        </div>
      )}
    </form>
  );
}
