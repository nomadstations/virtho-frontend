import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { SimpleModal } from '@/components/dashboard/SimpleModal';
import { Search, Plus, Edit, Trash2, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCoursesData } from '@/hooks/useCoursesData';

export default function CourseManagementSection() {
  const { courses, addCourse, updateCourse, deleteCourse, searchCourses } = useCoursesData();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  
  const defaultFormData = {
    title: '',
    description: '',
    instructor: '',
    duration: '',
    level: 'Beginner',
    category: 'Development',
    image: '',
    price: '',
    modules: '',
    prerequisites: '',
    start_date: '',
    end_date: '',
    status: 'Active'
  };

  const [formData, setFormData] = useState(defaultFormData);

  const filteredCourses = searchCourses(searchTerm);

  const handleOpenModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        ...course,
        instructor: typeof course.instructor === 'object' ? course.instructor.name : course.instructor,
        modules: course.modules?.toString() || ''
      });
    } else {
      setEditingCourse(null);
      setFormData(defaultFormData);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
    setFormData(defaultFormData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = ['title', 'instructor', 'level', 'category', 'duration', 'price'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast({ title: 'Validation Error', description: `${field} is required.`, variant: 'destructive' });
        return;
      }
    }

    const payload = {
      ...formData,
      instructor: { name: formData.instructor, avatar: `https://i.pravatar.cc/150?u=${formData.instructor.replace(/\s+/g, '')}` },
      modules: parseInt(formData.modules) || 0
    };

    if (editingCourse) {
      updateCourse(editingCourse.id, payload);
      toast({ title: 'Success', description: 'Course updated successfully.' });
    } else {
      addCourse(payload);
      toast({ title: 'Success', description: 'Course created successfully.' });
    }

    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(id);
      toast({ title: 'Success', description: 'Course deleted successfully.' });
    }
  };

  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
      case 'active': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">Active</Badge>;
      case 'draft': return <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-none">Draft</Badge>;
      case 'archived': return <Badge variant="outline" className="text-gray-500 border-gray-200">Archived</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="text-purple-600" />
            Course Management
          </h2>
          <p className="text-gray-500 text-sm mt-1">Manage learning content, pricing, and enrollments.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus size={16} className="mr-2" /> Add Course
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative max-w-md mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search by title or instructor..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Level / Category</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map(course => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium text-gray-900">
                      <div className="max-w-[200px] truncate" title={course.title}>
                        {course.title}
                      </div>
                      <div className="text-xs text-gray-500 font-normal mt-1">{course.duration} • {course.price}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img src={course.instructor?.avatar || `https://i.pravatar.cc/150?u=${course.id}`} alt="" className="w-6 h-6 rounded-full" />
                        <span className="text-sm">{course.instructor?.name || course.instructor}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{course.level}</div>
                      <div className="text-xs text-gray-500">{course.category}</div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {course.studentCount?.toLocaleString() || course.students_enrolled?.toLocaleString() || 0}
                    </TableCell>
                    <TableCell>{getStatusBadge(course.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenModal(course)} className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(course.id)} className="text-red-600 hover:text-red-800 hover:bg-red-50">
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No courses found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <SimpleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCourse ? 'Edit Course' : 'Create New Course'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Course Title *</label>
            <Input name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g., Advanced React Patterns" required />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <Textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Course description..." rows={3} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Instructor *</label>
              <Input name="instructor" value={formData.instructor} onChange={handleInputChange} placeholder="Instructor Name" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Duration *</label>
              <Input name="duration" value={formData.duration} onChange={handleInputChange} placeholder="e.g., 40 hours" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Level *</label>
              <select name="level" value={formData.level} onChange={handleInputChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" required>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Category *</label>
              <select name="category" value={formData.category} onChange={handleInputChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" required>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Marketing">Marketing</option>
                <option value="IT & Software">IT & Software</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Price *</label>
              <Input name="price" value={formData.price} onChange={handleInputChange} placeholder="e.g., $99.99 or Free" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Modules (Count)</label>
              <Input type="number" name="modules" value={formData.modules} onChange={handleInputChange} placeholder="e.g., 12" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Image URL</label>
            <Input name="image" value={formData.image} onChange={handleInputChange} placeholder="https://..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Status *</label>
              <select name="status" value={formData.status} onChange={handleInputChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" required>
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Prerequisites</label>
              <Input name="prerequisites" value={formData.prerequisites} onChange={handleInputChange} placeholder="e.g., Basic HTML" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Start Date</label>
              <Input type="text" name="start_date" value={formData.start_date} onChange={handleInputChange} placeholder="YYYY-MM-DD or Self-paced" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">End Date</label>
              <Input type="text" name="end_date" value={formData.end_date} onChange={handleInputChange} placeholder="YYYY-MM-DD or Self-paced" />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t">
            <Button type="button" variant="outline" onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
              {editingCourse ? 'Update Course' : 'Create Course'}
            </Button>
          </div>
        </form>
      </SimpleModal>
    </div>
  );
}