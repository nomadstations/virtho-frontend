const STORAGE_KEY = 'virtho_course_activities';

export const logCourseActivity = (action, courseName) => {
  try {
    const activities = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const newActivity = {
      id: Date.now().toString(),
      action,
      courseName,
      timestamp: new Date().toISOString()
    };
    
    const updatedActivities = [newActivity, ...activities].slice(0, 50); // Keep last 50
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedActivities));
    return newActivity;
  } catch (error) {
    console.error('Failed to log course activity', error);
  }
};

export const getCourseActivities = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (error) {
    console.error('Failed to get course activities', error);
    return [];
  }
};