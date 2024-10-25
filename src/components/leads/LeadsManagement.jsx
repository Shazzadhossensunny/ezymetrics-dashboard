import React, { useState } from 'react';
import { Search, Filter, MoreVertical, X } from 'lucide-react';

const LeadsManagement = () => {
  const [leads, setLeads] = useState([
      {
    id: 1,
    name: "John Smith",
    company: "Tech Corp",
    email: "john@techcorp.com",
    phone: "+1 (555) 123-4567",
    status: "New",
    source: "Website",
    value: 5000,
    lastContact: "2024-03-15",
    notes: "Interested in enterprise package"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    company: "Digital Solutions",
    email: "sarah@digital.com",
    phone: "+1 (555) 234-5678",
    status: "In Progress",
    source: "Referral",
    value: 7500,
    lastContact: "2024-03-14",
    notes: "Following up on demo"
  },
    // Add more dummy leads as needed
  ]);

  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const LeadModal = ({ lead, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Lead Details</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium">{lead.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Company</p>
            <p className="font-medium">{lead.company}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{lead.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className="font-medium">{lead.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Value</p>
            <p className="font-medium">${lead.value}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="relative w-full md:w-64 mb-4 md:mb-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search leads..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add Lead
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Company</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Value</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedLead(lead);
                  setShowModal(true);
                }}
              >
                <td className="py-3 px-4">{lead.name}</td>
                <td className="py-3 px-4">{lead.company}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      lead.status === 'New'
                        ? 'bg-green-100 text-green-800'
                        : lead.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="py-3 px-4">${lead.value}</td>
                <td className="py-3 px-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedLead && (
        <LeadModal lead={selectedLead} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default LeadsManagement;
