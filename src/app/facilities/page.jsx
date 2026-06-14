'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { api } from '@/utils/api';
import FacilityCard from '@/components/FacilityCard';
import Spinner from '@/components/Spinner';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, EyeOff, RotateCcw } from 'lucide-react';

const availableSports = [
  { label: 'All Sports', value: '' },
  { label: 'Football', value: 'football' },
  { label: 'Cricket', value: 'cricket' },
  { label: 'Badminton', value: 'badminton' },
  { label: 'Tennis', value: 'tennis' },
  { label: 'Basketball', value: 'basketball' },
  { label: 'Swimming', value: 'swimming' },
];

export default function AllFacilitiesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Retrieve initial sport_type parameter from URL
  const initialSport = searchParams.get('sport_type') || '';

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState(initialSport);
  const [triggerFetch, setTriggerFetch] = useState(0);

  // Sync state if URL query param changes
  useEffect(() => {
    const urlSport = searchParams.get('sport_type') || '';
    setSelectedSport(urlSport);
  }, [searchParams]);

  // Fetch facilities based on search and filters
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let endpoint = '/facilities';
        const params = [];

        if (searchTerm.trim()) {
          params.push(`search=${encodeURIComponent(searchTerm.trim())}`);
        }
        if (selectedSport) {
          params.push(`sport_type=${encodeURIComponent(selectedSport)}`);
        }

        if (params.length > 0) {
          endpoint += `?${params.join('&')}`;
        }

        const data = await api.get(endpoint);
        if (data.success && data.facilities) {
          setFacilities(data.facilities);
        }
      } catch (error) {
        setFacilities([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedSport, triggerFetch]);

  // Handle Search Form Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setTriggerFetch(prev => prev + 1);
  };

  // Toggle/Select Sport Type
  const handleSportSelect = (sport) => {
    setSelectedSport(sport);
    if (sport) {
      router.push(`/facilities?sport_type=${sport}`, { scroll: false });
    } else {
      router.push('/facilities', { scroll: false });
    }
  };

  // Clear all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedSport('');
    router.push('/facilities', { scroll: false });
    setTriggerFetch(prev => prev + 1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <div className="flex-grow bg-slate-50 dark:bg-[#070b19] transition-colors duration-250 py-16 px-4 sm:px-6 lg:px-8 relative min-h-[90vh]">
      
      {/* Background radial effects (only in dark mode) */}
      <div className="hidden dark:block absolute top-0 right-1/4 w-[350px] h-[350px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Page Header */}
        <div className="text-center space-y-3">
          <span className="text-blue-600 dark:text-sky-400 font-extrabold text-xs uppercase tracking-widest block">Explore Arenas</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">Sports Facilities</h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-xl mx-auto font-semibold leading-relaxed">
            Search, filter, and instantly reserve premium sports fields and courts around you.
          </p>
        </div>

        {/* Filters Controls Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-200 dark:border-slate-850/60 shadow-sm dark:shadow-xl dark:shadow-black/30 space-y-6 backdrop-blur-md"
        >
          
          {/* Search form and Reset button */}
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search by facility name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-sm active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center justify-center"
            >
              Search
            </button>
            {(searchTerm || selectedSport) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 px-6 py-3.5 rounded-2xl transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-center active:scale-95 shadow-sm"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear Filters
              </button>
            )}
          </form>

          {/* Horizontal Sport Type Filter Badges */}
          <div className="space-y-4 pt-1">
            <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              <SlidersHorizontal className="h-3.5 w-3.5 mr-2" />
              <span>Filter by Sport Category</span>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              {availableSports.map((sport) => {
                const isSelected = selectedSport === sport.value;
                return (
                  <button
                    key={sport.label}
                    onClick={() => handleSportSelect(sport.value)}
                    className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider border transition-all duration-200 active:scale-95 ${
                      isSelected
                        ? 'bg-blue-500/10 border-blue-400/30 text-blue-600 dark:text-sky-400 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800'
                    }`}
                  >
                    {sport.label}
                  </button>
                );
              })}
            </div>
          </div>

        </motion.div>

        {/* Facility Grid Display */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-28 flex justify-center"
            >
              <Spinner size="large" />
            </motion.div>
          ) : facilities.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-20 bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-900 rounded-3xl p-8 max-w-xl mx-auto shadow-sm space-y-5"
            >
              <div className="p-4 bg-slate-50 dark:bg-slate-900/60 text-slate-400 dark:text-slate-500 rounded-2xl w-fit mx-auto border border-slate-200 dark:border-slate-800">
                <EyeOff className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-300">No facilities found</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto font-medium">
                  We couldn't find any sports fields that match your criteria.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-sm"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {facilities.map((facility) => (
                <motion.div key={facility._id} variants={cardVariants}>
                  <FacilityCard facility={facility} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
