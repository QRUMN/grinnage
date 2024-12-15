import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Trash2 } from 'lucide-react';

export const VoiceMemoRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      clearInterval(timerRef.current);
      setRecordingTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Voice Memo</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-4">
          {isRecording ? (
            <button
              onClick={stopRecording}
              className="p-4 bg-red-500 rounded-full text-white hover:bg-red-600"
            >
              <Square className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={startRecording}
              className="p-4 bg-[#56e39f] rounded-full text-white hover:bg-[#33d789]"
            >
              <Mic className="w-6 h-6" />
            </button>
          )}
        </div>

        {isRecording && (
          <div className="text-center">
            <p className="text-2xl font-semibold text-red-500">
              {formatTime(recordingTime)}
            </p>
            <p className="text-sm text-gray-500">Recording...</p>
          </div>
        )}

        <div className="border-t dark:border-dark-700 pt-4 mt-4">
          <h3 className="text-sm font-medium mb-2">Recent Recordings</h3>
          <div className="space-y-2">
            {/* Placeholder for recordings list */}
            <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-dark-700 rounded">
              <div className="flex items-center">
                <Play className="w-4 h-4 mr-2" />
                <span className="text-sm">Voice Memo 1</span>
              </div>
              <button className="text-gray-500 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};