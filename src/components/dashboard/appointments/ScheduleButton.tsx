import React from 'react';
import { Calendar } from 'lucide-react';

export const ScheduleButton = () => {
  return (
    <button className="btn-primary">
      <Calendar className="w-4 h-4 mr-2" />
      Schedule Service
    </button>
  );
};