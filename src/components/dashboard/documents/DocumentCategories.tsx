import React from 'react';
import { FileText, FileCheck, FileSearch, FileClock } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Documents', icon: FileText, count: 12 },
  { id: 'agreements', label: 'Agreements', icon: FileCheck, count: 3 },
  { id: 'reports', label: 'Treatment Reports', icon: FileSearch, count: 6 },
  { id: 'invoices', label: 'Invoices', icon: FileClock, count: 3 },
];

export const DocumentCategories = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <div className="space-y-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-[#56e39f]/10 text-[#56e39f]'
                  : 'hover:bg-gray-50 dark:hover:bg-dark-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5" />
                <span>{category.label}</span>
              </div>
              <span className="text-sm bg-gray-100 dark:bg-dark-700 px-2 py-0.5 rounded-full">
                {category.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};