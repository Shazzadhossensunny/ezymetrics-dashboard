// LeadModal.jsx
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

const LeadModal = ({ lead, onClose }) => {
  if (!lead) return null;

  return (
    <Dialog.Root open={!!lead} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <Dialog.Content
        aria-describedby="lead-description"
        className="fixed w-full max-w-80 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50"
      >
        <Dialog.Title className="text-xl font-bold mb-4">Lead Details</Dialog.Title>
        <p id="lead-description" className="sr-only">
          Detailed information about the selected lead
        </p>
        <p><strong>Name:</strong> {lead.name}</p>
        <p><strong>Company:</strong> {lead.company}</p>
        <p><strong>Status:</strong> {lead.status}</p>
        <p><strong>Value:</strong> ${lead.value.toLocaleString()}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Close
        </button>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default LeadModal;
