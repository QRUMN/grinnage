import React from 'react';
import {
  File,
  FileText,
  FilePlus,
  Search,
  Filter,
  FolderOpen,
  Download,
  Share2,
  MoreVertical,
  Calendar,
  User2
} from 'lucide-react';

export const DocumentLibrary = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Document Library</h2>
          <p className="text-sm text-gray-500">Manage and organize your documents</p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
            <FolderOpen className="h-4 w-4 mr-2" />
            New Folder
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
            <FilePlus className="h-4 w-4 mr-2" />
            Upload Document
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {documentStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border p-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.iconBg} mr-3`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-lg font-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button className="px-3 py-1 text-sm font-medium text-primary border-b-2 border-primary">
                All Documents
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-primary">
                Contracts
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-primary">
                Invoices
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-primary">
                Reports
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button className="inline-flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modified By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((document) => (
                <tr key={document.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${document.iconBg} mr-3`}>
                        {document.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {document.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {document.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${document.typeColor}`}>
                      {document.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {document.modified}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User2 className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{document.modifiedBy}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {document.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-400 hover:text-gray-500">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const documentStats = [
  {
    icon: <File className="h-5 w-5 text-blue-500" />,
    iconBg: 'bg-blue-100',
    label: 'Total Documents',
    value: '245'
  },
  {
    icon: <FileText className="h-5 w-5 text-green-500" />,
    iconBg: 'bg-green-100',
    label: 'Contracts',
    value: '45'
  },
  {
    icon: <FileText className="h-5 w-5 text-yellow-500" />,
    iconBg: 'bg-yellow-100',
    label: 'Invoices',
    value: '128'
  },
  {
    icon: <FileText className="h-5 w-5 text-purple-500" />,
    iconBg: 'bg-purple-100',
    label: 'Reports',
    value: '72'
  }
];

const documents = [
  {
    id: 1,
    name: 'Annual Service Contract 2024',
    description: 'Main Office Service Agreement',
    type: 'Contract',
    typeColor: 'bg-green-100 text-green-800',
    modified: 'Jan 15, 2024',
    modifiedBy: 'John Smith',
    size: '2.4 MB',
    icon: <FileText className="h-5 w-5 text-green-500" />,
    iconBg: 'bg-green-100'
  },
  {
    id: 2,
    name: 'Q4 2023 Service Report',
    description: 'Quarterly Performance Analysis',
    type: 'Report',
    typeColor: 'bg-purple-100 text-purple-800',
    modified: 'Jan 10, 2024',
    modifiedBy: 'Sarah Johnson',
    size: '4.8 MB',
    icon: <FileText className="h-5 w-5 text-purple-500" />,
    iconBg: 'bg-purple-100'
  },
  {
    id: 3,
    name: 'Invoice #2024-001',
    description: 'January Services Invoice',
    type: 'Invoice',
    typeColor: 'bg-yellow-100 text-yellow-800',
    modified: 'Jan 5, 2024',
    modifiedBy: 'Mike Wilson',
    size: '1.2 MB',
    icon: <FileText className="h-5 w-5 text-yellow-500" />,
    iconBg: 'bg-yellow-100'
  }
];
