import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Star, Users, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

function CourseListView({ course, index }) {
  // Alternate layout based on index
  const isEven = index % 2 === 0;

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)' }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row group"
    >
      <Link 
        to={`/learning/${course.id}`} 
        className={`relative overflow-hidden md:w-2/5 aspect-[16/9] md:aspect-auto md:min-h-[220px] flex-shrink-0 block ${!isEven ? 'md:order-2' : ''}`}
      >
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-purple-800 text-xs font-bold shadow-md uppercase tracking-wider">
            {course.category}
          </span>
        </div>
        {course.priceType === 'Free' && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold shadow-md">
              FREE
            </span>
          </div>
        )}
      </Link>
      
      <div className={`p-6 flex flex-col flex-grow justify-center ${!isEven ? 'md:order-1 md:pr-10' : 'md:pl-10'}`}>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-700">{course.rating}</span>
            <span className="text-gray-400">({course.reviewCount.toLocaleString()})</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-purple-600" />
            <span>{course.duration}</span>
          </div>
        </div>

        <Link to={`/learning/${course.id}`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors leading-tight">
            {course.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed text-sm">
          {course.description}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-2">
            <img src={course.instructor.avatar} alt={course.instructor.name} className="w-6 h-6 rounded-full border border-gray-200" />
            <span className="font-medium text-gray-700">{course.instructor.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>{course.difficulty}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{course.studentCount.toLocaleString()} students</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 hidden lg:flex">
          {course.skills?.slice(0, 4).map(skill => (
            <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
              {skill}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="font-extrabold text-2xl text-gray-900">
            {course.price}
          </div>
          <Link to={`/learning/${course.id}`} className="group/btn">
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold gap-2 rounded-lg px-6"
            >
              View Course
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default CourseListView;