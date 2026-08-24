import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AppointmentCard({ title, doctor, date, time }) {
  return (
    <div className="health-project-card p-6 flex flex-col group h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
          <Calendar className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">Upcoming Appointment</h3>
      </div>
      <div className="flex-grow pt-2">
        <p className="font-semibold text-gray-900 text-lg mb-1">{title}</p>
        <p className="text-gray-600 mb-4">{doctor}</p>
        <div className="inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
          {date}, {time}
        </div>
      </div>
      <div className="mt-6 flex justify-between items-center border-t border-gray-100 pt-4">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Scheduled</span>
        <Button variant="ghost" className="text-purple-700 hover:text-purple-800 hover:bg-purple-50 rounded-full font-semibold gap-2 -mr-4">
          View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}