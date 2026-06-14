'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { api } from '@/utils/api';
import TutorCard from '@/components/TutorCard';
import Spinner from '@/components/Spinner';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, EyeOff, RotateCcw, Calendar } from 'lucide-react';

export default function AllTutorsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [triggerFetch, setTriggerFetch] = useState(0);

  // Fetch tutors based on search and filters
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let endpoint = '/tutors';
        const params = [];

        if (searchTerm.trim()) {
          params.push(`search=${encodeURIComponent(searchTerm.trim())}`);
        }
        if (startDate) {
          params.push(`startDate=${encodeURIComponent(startDate)}`);
        }
        if (endDate) {
          params.push(`endDate=${encodeURIComponent(endDate)}`);
        }

        if (params.length > 0) {
          endpoint += `?${params.join('&')}`;
        }

        const data = await api.get(endpoint);
        if (data.success && data.tutors) {
          setTutors(data.tutors);
        }
      } catch (error) {
        setTutors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [startDate, endDate, triggerFetch]);

  // Handle Search Form Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setTriggerFetch(prev => prev + 1);
  };

  // Clear all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
    router.push('/tutors', { scroll: false });
    setTriggerFetch(prev => prev + 1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="flex-grow bg-slate-50 dark:bg-[#070b19] py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-250 relative min-h-screen">
      
      {/* Ambient background glows (only dark mode) */}
      <div className="hidden dark:block absolute top-0 right-1/4 w-[350px] h-[350px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="hidden dark:block absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-blue-600 dark:text-sky-400 font-extrabold text-xs uppercase tracking-widest block">Find Your Tutor</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">Explore Expert Tutors</h1>
          <p className="text-slate-650 dark:text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto font-semibold leading-relaxed">
            Browse our carefully curated list of experienced tutors. Filter by dates to find the perfect match for your learning journey.
          </p>
        </div>

        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-800/60 shadow-sm dark:shadow-xl backdrop-blur-md space-y-5"
        >
          
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-600 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by tutor name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider"
              />
            </div>

            {/* Date Range Filter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-600 pointer-events-none" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs"
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-600 pointer-events-none" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs"
                />
              </div>
            </div>

            {/* Button Row */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest transition-all"
              >
                <Search className="h-4.5 w-4.5" />
                Search
              </button>
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-widest transition-all"
              >
                <RotateCcw className="h-4.5 w-4.5" />
                Reset
              </button>
            </div>
          </form>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size="large" />
          </div>
        ) : tutors.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 space-y-4"
          >
            <EyeOff className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-700" />
            <p className="text-slate-600 dark:text-slate-300 font-bold text-lg">No tutors found matching your criteria</p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest transition-all"
            >
              <RotateCcw className="h-4 w-4" />
              Try Again
            </button>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {tutors.map((tutor) => (
                <motion.div key={tutor._id} variants={itemVariants}>
                  <TutorCard tutor={tutor} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
