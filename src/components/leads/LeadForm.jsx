// LeadForm.jsx
import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';

const LeadForm = ({ onClose }) => {
  const { addLead } = useDashboard();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    status: '',
    value: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addLead(formData);
    onClose(); // Close the form after submission
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add Lead</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full border rounded-lg p-2"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Company</label>
            <input
              type="text"
              required
              className="w-full border rounded-lg p-2"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              required
              className="w-full border rounded-lg p-2"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="">Select Status</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Value</label>
            <input
              type="number"
              required
              className="w-full border rounded-lg p-2"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            />
          </div>
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
            Add Lead
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
