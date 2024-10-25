import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import LeadModal from './LeadModal';
import LeadForm from './LeadForm';

const LeadsManagement = () => {
  const { leads } = useDashboard();
  const [selectedLead, setSelectedLead] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    source: ''
  });

  const filteredLeads = leads.filter(lead => {
    if (filters.status && lead.status !== filters.status) return false;
    if (filters.source && lead.source !== filters.source) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Leads Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Add Lead
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-full border rounded-lg p-2"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Source</label>
            <select
              className="w-full border rounded-lg p-2"
              value={filters.source}
              onChange={(e) => setFilters({ ...filters, source: e.target.value })}
            >
              <option value="">All Sources</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedLead(lead)}
              >
                <td className="px-6 py-4 whitespace-nowrap">{lead.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.company}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    lead.status === 'New' ? 'bg-green-100 text-green-800' :
                    lead.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${lead.value.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedLead && (
        <LeadModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}

      {showAddForm && (
        <LeadForm
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default LeadsManagement;