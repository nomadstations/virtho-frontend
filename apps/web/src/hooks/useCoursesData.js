import { useState, useEffect } from 'react';
import { MOCK_COURSES } from '@/constants/mockDataConfig';
import { logCourseActivity } from '@/utils/CourseActivityLog';

const STORAGE_KEY = 'virtho_courses';

export function useCoursesData() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCourses(JSON.parse(stored));
    } else {
      setCourses(MOCK_COURSES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_COURSES));
    }
  }, []);

  const saveToStorage = (updatedCourses) => {
    setCourses(updatedCourses);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCourses));
  };

  const addCourse = (courseData) => {
    const newCourse = {
      ...courseData,
      id: `course_${Date.now()}`,
      students_enrolled: 0,
      studentCount: 0,
      rating: 0,
      reviewCount: 0,
      priceType: courseData.price.toLowerCase() === 'free' ? 'Free' : 'Paid',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    saveToStorage([newCourse, ...courses]);
    logCourseActivity('Created', courseData.title);
    return newCourse;
  };

  const updateCourse = (id, updates) => {
    const updatedCourses = courses.map(course => {
      if (course.id === id) {
        return {
          ...course,
          ...updates,
          priceType: updates.price?.toLowerCase() === 'free' ? 'Free' : 'Paid',
          updated_at: new Date().toISOString()
        };
      }
      return course;
    });
    
    const courseName = courses.find(c => c.id === id)?.title;
    saveToStorage(updatedCourses);
    logCourseActivity('Updated', courseName || 'Unknown Course');
  };

  const deleteCourse = (id) => {
    const courseName = courses.find(c => c.id === id)?.title;
    const updatedCourses = courses.filter(course => course.id !== id);
    saveToStorage(updatedCourses);
    logCourseActivity('Deleted', courseName || 'Unknown Course');
  };

  const searchCourses = (term) => {
    if (!term) return courses;
    const lowerTerm = term.toLowerCase();
    return courses.filter(course => 
      course.title.toLowerCase().includes(lowerTerm) || 
      (course.instructor?.name || course.instructor || '').toLowerCase().includes(lowerTerm)
    );
  };

  return {
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    searchCourses
  };
}