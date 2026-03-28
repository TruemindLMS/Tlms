'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, X, Grid3x3, List, ChevronDown, Users, Star, ArrowRight, Sparkles } from 'lucide-react';

// Types
interface Course {
  id: number;
  title: string;
  category: 'DEVELOPMENTS' | 'DESIGN' | 'MARKETING';
  rating: number;
  students: number;
  price: number;
  origPrice: number | null;
  image: string;
  instructor: string;
  level: string;
}

// Initial Data
const initialCourses: Course[] = [
  {
    id: 1,
    title: "Complete Blender Creator: Learn 3D Modelling for Beginners",
    category: "DEVELOPMENTS",
    rating: 4.5,
    students: 435671,
    price: 16.00,
    origPrice: null,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
    instructor: "John Smith",
    level: "Beginner"
  },
  {
    id: 2,
    title: "SQL Bootcamp 2025: Weekender Crash Course",
    category: "DEVELOPMENTS",
    rating: 4.5,
    students: 435671,
    price: 13.00,
    origPrice: 49.99,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&h=300&fit=crop",
    instructor: "Sarah Johnson",
    level: "All Levels"
  },
  {
    id: 3,
    title: "SEO 2025: Complete SEO Training + WordPress SEO",
    category: "DEVELOPMENTS",
    rating: 4.5,
    students: 435671,
    price: 13.00,
    origPrice: 84.99,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop",
    instructor: "Mike Chen",
    level: "Intermediate"
  },
  {
    id: 4,
    title: "Graphic Design Masterclass - Learn Great Design",
    category: "DESIGN",
    rating: 4.0,
    students: 285432,
    price: 56.00,
    origPrice: null,
    image: "https://images.unsplash.pcom/photo-1581291518633-83b4ebd1d83e?w=500&h=300&fit=crop",
    instructor: "Emily Davis",
    level: "Beginner"
  },
  {
    id: 5,
    title: "Ultimate AWS Certified Cloud Practitioner - 2025",
    category: "DEVELOPMENTS",
    rating: 4.8,
    students: 892134,
    price: 13.00,
    origPrice: 129.99,
    image: "https://images.unsplash.pm com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop",
    instructor: "Ryan Adams",
    level: "All Levels"
  },
  {
    id: 6,
    title: "Complete Python Bootcamp From Zero to Hero",
    category: "DEVELOPMENTS",
    rating: 4.7,
    students: 1245678,
    price: 13.00,
    origPrice: 94.99,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=300&fit=crop",
    instructor: "Jose Portilla",
    level: "Beginner"
  }
];

export default function Home() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Enroll form states
  const [enrollName, setEnrollName] = useState('');
  const [enrollEmail, setEnrollEmail] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  // Filter and sort courses
  const filterAndSortCourses = useCallback(() => {
    let filtered = [...courses];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(term) ||
          course.instructor.toLowerCase().includes(term)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((course) => course.category === selectedCategory);
    }

    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.students - a.students);
        break;
      case 'priceLow':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'latest':
      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedCategory, sortBy]);

  useEffect(() => {
    filterAndSortCourses();
  }, [filterAndSortCourses]);

  const displayToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleEnroll = (course: Course) => {
    setSelectedCourse(course);
    setIsEnrollModalOpen(true);
    setEnrollName('');
    setEnrollEmail('');
    setFieldErrors({});
  };

  const handleConfirmEnroll = () => {
    if (!enrollName.trim()) {
      setFieldErrors({ name: true });
      return;
    }
    if (!enrollEmail.trim() || !enrollEmail.includes('@')) {
      setFieldErrors({ email: true });
      return;
    }

    if (selectedCourse) {
      setCourses(
        courses.map((course) =>
          course.id === selectedCourse.id
            ? { ...course, students: course.students + 1 }
            : course
        )
      );
      displayToast(`✨ Welcome ${enrollName}! You're now enrolled in ${selectedCourse.title}`);
      setIsEnrollModalOpen(false);
      setSelectedCourse(null);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="w-3.5 h-3.5 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-3.5 h-3.5 text-gray-300" />
        ))}
      </div>
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'DEVELOPMENTS':
        return 'bg-blue-100 text-blue-700';
      case 'DESIGN':
        return 'bg-purple-100 text-purple-700';
      case 'MARKETING':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'DEVELOPMENTS', label: 'Developments' },
    { value: 'DESIGN', label: 'Design' },
    { value: 'MARKETING', label: 'Marketing' },
  ];

  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'priceLow', label: 'Price: Low to High' },
    { value: 'priceHigh', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.3s ease-out forwards;
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        
        .card-hover-effect {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover-effect:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15);
        }
        
        .modal-backdrop {
          animation: fadeIn 0.2s ease-out forwards;
        }
        
        .toast-enter {
          animation: slideInUp 0.3s ease-out forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-4 mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Course Library
            </h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">Discover and enroll in amazing courses</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-all duration-300 group-focus-within:text-indigo-500" />
              <input
                type="text"
                placeholder="Search courses by title or instructor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 hover:shadow-md"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[140px] group">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none cursor-pointer transition-all duration-300 hover:shadow-md"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none transition-transform duration-300 group-hover:rotate-180" />
              </div>

              <div className="relative flex-1 min-w-[140px] group">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none cursor-pointer transition-all duration-300 hover:shadow-md"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none transition-transform duration-300 group-hover:rotate-180" />
              </div>

              <div className="flex gap-1 bg-gray-100 rounded-xl p-1 shrink-0">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid'
                    ? 'bg-white shadow-sm text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                  aria-label="Grid view"
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list'
                    ? 'bg-white shadow-sm text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredCourses.length}</span> courses
          </p>
        </div>

        {/* Course Grid/List */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
              }`}
          >
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 cursor-pointer ${viewMode === 'grid' ? 'card-hover-effect' : 'hover:shadow-md'
                  }`}
                onClick={() => viewMode === 'grid' && handleEnroll(course)}
                onMouseEnter={() => setHoveredCard(course.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {viewMode === 'grid' ? (
                  <>
                    <div className="relative overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover transition-transform duration-500"
                        style={{ transform: hoveredCard === course.id ? 'scale(1.05)' : 'scale(1)' }}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop';
                        }}
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-lg ${getCategoryColor(course.category)}`}>
                          {course.category}
                        </span>
                        <div className="flex items-center gap-1">
                          {renderStars(course.rating)}
                          <span className="text-xs text-gray-600">{course.rating}</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 min-h-[48px] transition-colors duration-300 hover:text-indigo-600">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                        <Users className="w-3.5 h-3.5" />
                        <span>{course.students.toLocaleString()} students</span>
                        <span>•</span>
                        <span>{course.level}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div>
                          <span className="text-xl font-bold text-indigo-600">${course.price.toFixed(2)}</span>
                          {course.origPrice && (
                            <span className="ml-2 text-xs text-gray-400 line-through">${course.origPrice.toFixed(2)}</span>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEnroll(course);
                          }}
                          className="px-4 py-1.5 text-pimary-600 hover:text-primary-700 font-semibold text-sm hover:bg-primary-50 rounded-lg transition-all duration-300 flex items-center gap-1 group/btn"
                        >
                          Enroll
                          <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col sm:flex-row transition-all duration-300 hover:bg-gray-50">
                    <div className="relative overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full sm:w-56 h-48 object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop';
                        }}
                      />
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                        <div>
                          <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-lg ${getCategoryColor(course.category)}`}>
                            {course.category}
                          </span>
                          <h3 className="text-lg font-bold text-gray-900 mt-2 mb-1 transition-colors duration-300 hover:text-indigo-600">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600">by {course.instructor}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {renderStars(course.rating)}
                          <span className="text-sm text-gray-600">{course.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students.toLocaleString()} students</span>
                        </div>
                        <span>•</span>
                        <span>{course.level}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-indigo-600">${course.price.toFixed(2)}</span>
                          {course.origPrice && (
                            <span className="ml-2 text-sm text-gray-400 line-through">${course.origPrice.toFixed(2)}</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleEnroll(course)}
                          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 group/btn"
                        >
                          Enroll Now
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Enroll Modal with Animation */}
        {isEnrollModalOpen && selectedCourse && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={() => setIsEnrollModalOpen(false)}>
            <div className="bg-white rounded-2xl max-w-md w-full animate-scaleIn" onClick={(e) => e.stopPropagation()}>
              <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  Enroll in Course
                </h2>
                <button onClick={() => setIsEnrollModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-all duration-200">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{selectedCourse.title}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span>👤 {selectedCourse.instructor}</span>
                    <span> {selectedCourse.level}</span>
                    <span>👥 {selectedCourse.students.toLocaleString()} students</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={enrollName}
                      onChange={(e) => setEnrollName(e.target.value)}
                      className={`w-full px-3 py-2 border ${fieldErrors.name ? 'border-red-500 animate-shake' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300`}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={enrollEmail}
                      onChange={(e) => setEnrollEmail(e.target.value)}
                      className={`w-full px-3 py-2 border ${fieldErrors.email ? 'border-red-500 animate-shake' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300`}
                      placeholder="you@email.com"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="font-semibold text-gray-700">Total</span>
                    <span className="text-2xl font-bold text-indigo-600">${selectedCourse.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
                <button onClick={() => setIsEnrollModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300">
                  Cancel
                </button>
                <button onClick={handleConfirmEnroll} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2">
                  Confirm Enrollment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}


        {showToast && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-lg text-sm font-medium z-50 animate-slideInUp flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
}