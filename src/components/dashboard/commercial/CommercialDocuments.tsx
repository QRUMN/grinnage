import React from 'react';
import { FileText, Download, Eye, Upload } from 'lucide-react';
import { DashboardCard } from '../common/DashboardCard';

interface Document {
  id: string;
  name: string;
  type: string;
  location: string;
  date: string;
  size: string;
}

export const CommercialDocuments = () => {
  const documents: Document[] = [
    {
      id: '1',
      name: 'Service Agreement.pdf',
      type: 'Contract',
      location: 'Main Office',
      date: '2024-03-01',
      size: '2.4 MB'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Documents</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage contracts and service documents</p>
        </div>
        <button className="btn-primary">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </button>
      </div>

      <DashboardCard>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 border dark:border-dark-700 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <FileText className="w-8 h-8 text-[#56e39f]" />
                <div>
                  <h3 className="font-medium">{doc.name}</h3>
                  <div className="flex space-x-4 mt-1">
                    <span className="text-sm text-gray-500">{doc.location}</span>
                    <span className="text-sm text-gray-500">{doc.type}</span>
                    <span className="text-sm text-gray-500">{doc.date}</span>
                    <span className="text-sm text-gray-500">{doc.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-[#56e39f]">
                  <Eye className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-[#56e39f]">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
};