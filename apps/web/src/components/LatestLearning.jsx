import React from 'react';
import { BookOpen, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_COURSES = [
  { id: '1', title: 'Advanced React Patterns', duration: '6 hours', level: 'Advanced', instructor: 'Sarah Drasner' },
  { id: '2', title: 'Introduction to Blockchain', duration: '4.5 hours', level: 'Beginner', instructor: 'Vitalik Nakamoto' },
  { id: '3', title: 'Sustainable Architecture', duration: '8 hours', level: 'Intermediate', instructor: 'Elena Green' },
  { id: '4', title: 'Data Science Fundamentals', duration: '12 hours', level: 'Beginner', instructor: 'Dr. Alan Turing' },
];

export default function LatestLearning() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {MOCK_COURSES.map(course => (
        <div key={course.id} className="p-5 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group hover:-translate-y-1" style={{ borderColor: 'hsla(var(--zone-knowledge), 0.2)' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 bg-primary-lighter text-primary-dark text-[10px] font-bold uppercase tracking-wider rounded">
              {course.level}
            </span>
          </div>
          <h3 className="font-bold text-foreground mb-2 line-clamp-2">{course.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 flex-1">By {course.instructor}</p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border text-xs text-muted-foreground">
            <div className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {course.duration}
            </div>
            <Link to={`/learning/${course.id}`} className="font-semibold text-primary hover:text-primary-dark transition-colors flex items-center">
              View Course
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}