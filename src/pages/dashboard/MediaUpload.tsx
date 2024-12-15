import React from 'react';
import { MediaUploader } from '../../components/dashboard/media/MediaUploader';
import { MediaGallery } from '../../components/dashboard/media/MediaGallery';
import { VoiceMemoRecorder } from '../../components/dashboard/media/VoiceMemoRecorder';

export const MediaUpload = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Media Upload</h1>
        <p className="text-gray-600 dark:text-gray-400">Upload photos, videos, and voice memos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MediaUploader />
          <MediaGallery />
        </div>
        <div>
          <VoiceMemoRecorder />
        </div>
      </div>
    </div>
  );
};