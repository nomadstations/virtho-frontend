import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Plus, Search, BookOpen, Clock, Users, TrendingUp, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardBreadcrumb from '@/components/DashboardBreadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useCourseCreationModal } from '@/hooks/useCourseCreationModal';
import CourseCreationModal from '@/components/CourseCreationModal';
import { useToast } from '@/hooks/use-toast';

/**
 * LearningManagementPage - Dashboard page for managing courses
 * 
 * Features:
 * - Dashboard breadcrumb: "Dashboard home > Learning"
 * - Search and filter user's own courses
 * - Table view of courses with key metrics
 * - Create new course button
 * - Course actions (view, edit, delete)
 * - Statistics cards (total courses, enrollments, completion rate)
 */
export default function LearningManagementPage() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const { isOpen: isCreateModalOpen, openModal: openCreateModal, closeModal: closeCreateModal } = useCourseCreationModal();

  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Load courses from localStorage on mount
  useEffect(() => {
    const loadCourses = () => {
      const storedCourses = localStorage.getItem('courses');
      if (storedCourses) {
        try {
          const allCourses = JSON.parse(storedCourses);
          // Filter to show only current user's courses
          const userCourses = allCourses.filter(course => course.instructorId === currentUser?.id);
          setCourses(userCourses);
          setFilteredCourses(userCourses);
        } catch (error) {
          console.error('Error loading courses:', error);
        }
      }
    };

    loadCourses();
  }, [currentUser]);

  // Filter courses based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCourses(courses);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = courses.filter(course =>
      course.title?.toLowerCase().includes(query) ||
      course.category?.toLowerCase().includes(query) ||
      course.level?.toLowerCase().includes(query)
    );
    setFilteredCourses(filtered);
  }, [searchQuery, courses]);

  // Handle course creation
  const handleCourseCreated = (newCourse) => {
    setCourses(prev => [newCourse, ...prev]);
    setFilteredCourses(prev => [newCourse, ...prev]);
    closeCreateModal();
    toast({
      title: "Course created successfully!",
      description: `${newCourse.title} has been added to your courses.`,
    });
  };

  // Handle course deletion
  const handleDelete = (courseId) => {
    try {
      const storedCourses = localStorage.getItem('courses');
      if (storedCourses) {
        const allCourses = JSON.parse(storedCourses);
        const updatedCourses = allCourses.filter(c => c.id !== courseId);
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
        
        setCourses(prev => prev.filter(c => c.id !== courseId));
        setFilteredCourses(prev => prev.filter(c => c.id !== courseId));
        
        toast({
          title: "Course deleted",
          description: "The course has been removed successfully.",
        });
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      toast({
        title: "Error",
        description: "Failed to delete course. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Calculate statistics
  const stats = {
    totalCourses: courses.length,
    totalEnrollments: courses.reduce((sum, course) => sum + (course.enrolled || 0), 0),
    averageRating: courses.length > 0 
      ? (courses.reduce((sum, course) => sum + (course.rating || 0), 0) / courses.length).toFixed(1)
      : '0.0',
    completionRate: courses.length > 0
      ? Math.round((courses.filter(c => c.status === 'published').length / courses.length) * 100)
      : 0
  };

  return (
    <>
      <Helmet>
        <title>Learning Management - Dashboard</title>
        <meta name="description" content="Manage your courses, track enrollments, and monitor student progress." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Breadcrumb */}
          <DashboardBreadcrumb pageName="Learning" />

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Management</h1>
                <p className="text-gray-600">
                  Manage your courses, track enrollments, and monitor student progress
                </p>
              </div>
              <Button
                onClick={openCreateModal}
                className="bg-lavender-primary hover:bg-lavender-dark text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-900">{stats.totalCourses}</div>
                    <BookOpen className="w-8 h-8 text-lavender-primary opacity-75" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Enrollments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-900">{stats.totalEnrollments}</div>
                    <Users className="w-8 h-8 text-green-500 opacity-75" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Average Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-900">{stats.averageRating}</div>
                    <TrendingUp className="w-8 h-8 text-yellow-500 opacity-75" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Published</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-900">{stats.completionRate}%</div>
                    <Clock className="w-8 h-8 text-blue-500 opacity-75" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search courses by title, category, or level..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
          </motion.div>

          {/* Courses Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>
                  {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {courses.length === 0 ? 'No courses yet' : 'No courses found'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {courses.length === 0
                        ? 'Get started by creating your first course'
                        : 'Try adjusting your search query'}
                    </p>
                    {courses.length === 0 && (
                      <Button onClick={openCreateModal} className="bg-lavender-primary hover:bg-lavender-dark text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Course
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course Title</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Level</TableHead>
                          <TableHead className="text-center">Enrolled</TableHead>
                          <TableHead className="text-center">Rating</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCourses.map((course) => (
                          <TableRow key={course.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-3">
                                {course.image && (
                                  <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-12 h-12 rounded object-cover"
                                  />
                                )}
                                <div>
                                  <div className="font-semibold text-gray-900">{course.title}</div>
                                  <div className="text-sm text-gray-500">{course.duration || 'N/A'}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{course.category || 'Uncategorized'}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{course.level || 'All Levels'}</Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              {course.enrolled || 0}
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-1">
                                <span className="font-semibold">{course.rating || '0.0'}</span>
                                <span className="text-yellow-500">★</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge
                                variant={course.status === 'published' ? 'default' : 'secondary'}
                                className={course.status === 'published' ? 'bg-green-500' : ''}
                              >
                                {course.status || 'draft'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Course
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Course
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleDelete(course.id)}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Course
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Course Creation Modal */}
      <CourseCreationModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onCourseCreated={handleCourseCreated}
      />
    </>
  );
}