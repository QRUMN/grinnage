import React from 'react';
import { Image, Video, Mic, Trash2, Download } from 'lucide-react';
import { DashboardCard } from '../common/DashboardCard';
import { formatDate } from '../../../utils/date';

interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  name: string;
  date: string;
  size: string;
}

export const MediaGallery = () => {
  const mediaItems: MediaItem[] = [
    {
      id: '1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
      name: 'Issue Photo 1',
      date: '2024-03-01',
      size: '2.4 MB'
    }
  ];

  const getIcon = (type: MediaItem['type']) => {
    switch (type) {
      case 'image':
        return <Image className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'audio':
        return <Mic className="w-5 h-5" />;
    }
  };

  return (
    <DashboardCard title="Media Gallery" className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mediaItems.map((item) => (
          <div
            key={item.id}
            className="border dark:border-dark-700 rounded-lg overflow-hidden"
          >
            {item.type === 'image' && (
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getIcon(item.type)}
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="text-sm text-gray-500">{item.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {formatDate(item.date)}
                </span>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-500 hover:text-[#56e39f]">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};