import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Plus, Search, Filter, Building2, Phone, MapPinned, Users } from 'lucide-react';

export const CommercialLocations = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Locations</h2>
          <p className="text-sm text-gray-500">Manage your business locations</p>
        </div>
        <Link
          to="new"
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Location
        </Link>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search locations..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="inline-flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <Link
            key={location.id}
            to={location.id}
            className="bg-white rounded-lg border hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <Building2 className="h-6 w-6 text-primary mr-3" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{location.name}</h3>
                    <p className="text-sm text-gray-500">{location.type}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  location.status === 'Active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {location.status}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPinned className="h-4 w-4 mr-2" />
                  {location.address}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="h-4 w-4 mr-2" />
                  {location.phone}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-2" />
                  {location.staff} Staff Members
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-gray-500">Next Service:</span>
                    <span className="ml-2 font-medium">{location.nextService}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Contract:</span>
                    <span className="ml-2 font-medium">{location.contractType}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const locations = [
  {
    id: 'LOC001',
    name: 'Main Office',
    type: 'Corporate Office',
    status: 'Active',
    address: '123 Business Ave, Suite 100',
    phone: '(555) 123-4567',
    staff: 12,
    nextService: 'Dec 20, 2024',
    contractType: 'Annual'
  },
  {
    id: 'LOC002',
    name: 'Warehouse A',
    type: 'Distribution Center',
    status: 'Active',
    address: '456 Industrial Pkwy',
    phone: '(555) 234-5678',
    staff: 8,
    nextService: 'Dec 18, 2024',
    contractType: 'Quarterly'
  },
  {
    id: 'LOC003',
    name: 'Downtown Branch',
    type: 'Retail',
    status: 'Pending',
    address: '789 Main St',
    phone: '(555) 345-6789',
    staff: 5,
    nextService: 'Dec 22, 2024',
    contractType: 'Monthly'
  }
];
