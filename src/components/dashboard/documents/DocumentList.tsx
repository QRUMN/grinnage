import React from 'react';
import { FileText, Download, Eye, Trash2 } from 'lucide-react';
import { formatDate } from '../../../utils/date';

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  category: string;
}

export const DocumentList = () => {
  const documents: Document[] = [
    {
      id: '1',
      name: 'Service Agreement.pdf',
      type: 'PDF',
      date: '2024-03-01',
      size: '245 KB',
      category: 'Agreements'
    },
    {
      id: '2',
      name: 'February Treatment Report.pdf',
      type: 'PDF',
      date: '2024-02-28',
      size: '180 KB',
      category: 'Reports'
    }
  ];

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg">
      <div className="p-6">
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 border dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <FileText className="w-8 h-8 text-[#56e39f]" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(doc.date)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {doc.size}
                    </span>
                    <span className="text-sm px-2 py-0.5 bg-gray-100 dark:bg-dark-700 rounded-full">
                      {doc.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  title="View"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  title="Download"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};