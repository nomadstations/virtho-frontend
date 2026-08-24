import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Star, Users, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/ui/primitives/button';

function CourseCard({ course }) {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer h-full flex flex-col group"
    >
      <Link to={`/learning/${course.id}`} className="relative overflow-hidden aspect-[16/9] block">
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
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-700">{course.rating}</span>
            <span className="text-gray-400">({course.reviewCount.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-purple-600" />
            <span>{course.duration}</span>
          </div>
        </div>

        <Link to={`/learning/${course.id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors leading-tight">
            {course.title}
          </h3>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <img src={course.instructor.avatar} alt={course.instructor.name} className="w-8 h-8 rounded-full border border-gray-200" />
          <span className="text-sm text-gray-600 font-medium truncate">{course.instructor.name}</span>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-5">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.difficulty}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.studentCount.toLocaleString()} students</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="font-extrabold text-xl text-gray-900">
            {course.price}
          </div>
          <Link to={`/learning/${course.id}`} className="group/btn">
            <Button 
              size="sm"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold gap-1.5 rounded-lg"
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

export default CourseCard;