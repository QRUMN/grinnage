import React from 'react';
import { DocumentList } from '../../components/dashboard/documents/DocumentList';
import { DocumentUpload } from '../../components/dashboard/documents/DocumentUpload';
import { DocumentCategories } from '../../components/dashboard/documents/DocumentCategories';

export const Documents = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Documents</h1>
          <p className="text-gray-600 dark:text-gray-400">Access and manage your documents</p>
        </div>
        <DocumentUpload />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div>
          <DocumentCategories />
        </div>
        <div className="lg:col-span-3">
          <DocumentList />
        </div>
      </div>
    </div>
  );
};