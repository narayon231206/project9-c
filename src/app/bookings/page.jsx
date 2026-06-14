'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Spinner from '@/components/Spinner';
import Modal from '@/components/Modal';
import { getSafeImageSrc, handleImageFallback } from '@/utils/images';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar,
  ShoppingCart, 
  Clock, 
  MapPin, 
  Trash2, 
  CalendarDays
} from 'lucide-react';

const formatBookingDate = (value) => {
  if (!value) return 'Unknown date';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function MyBookingsPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal Cancel confirmation States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await api.get('/bookings/my-bookings');
      const nextBookings = Array.isArray(data) ? data : data.bookings;
      if (Array.isArray(nextBookings)) {
        // Show only active bookings. Cancelled bookings should disappear from this dashboard.
        const validBookings = nextBookings.filter(
          (booking) => booking.facility_id && (booking.status || '').toLowerCase() !== 'cancelled'
        );
        setBookings(validBookings);
      } else {
        setBookings([]);
      }
    } catch (error) {
      toast.error('Failed to load your bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    fetchBookings();
  }, [authLoading, isAuthenticated]);

  // Handle Cancel Booking Trigger Modal
  const handleCancelClick = (id) => {
    setSelectedBookingId(id);
    setIsModalOpen(true);
  };

  // Perform Booking Cancel Call
  const handleConfirmCancel = async () => {
    try {
      setCancelling(true);
      const res = await api.patch(`/bookings/${selectedBookingId}/cancel`);
      if (res.success || res.booking) {
        toast.success(res.message || 'Booking cancelled successfully!');
        // Update local state list to drop the cancelled booking card immediately.
        setBookings(prev => prev.filter(b => b._id !== selectedBookingId));
      }
    } catch (error) {
      toast.error(error.message || 'Failed to cancel booking');
    } finally {
      setIsModalOpen(false);
      setSelectedBookingId(null);
      setCancelling(false);
    }
  };

  const statusColors = {
    pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    confirmed: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    cancelled: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
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
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <ProtectedRoute>
      <div className="flex-grow bg-slate-55 dark:bg-[#070b19] py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200 relative min-h-[90vh]">
        
        {/* Ambient background glows (only dark mode) */}
        <div className="hidden dark:block absolute top-0 right-1/4 w-[350px] h-[350px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          
          {/* Header section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
            <div className="space-y-3">
              <span className="text-blue-600 dark:text-sky-400 font-extrabold text-xs uppercase tracking-widest block">Dashboard</span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">My Match Bookings</h1>
              <p className="text-slate-650 dark:text-slate-400 text-xs sm:text-sm font-semibold max-w-xl">
                Keep track of your active time slots, booking status, and team match dates.
              </p>
            </div>
            <Link
              href="/facilities"
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-sm active:scale-95 transition-all flex items-center"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Book New Turf
            </Link>
          </div>

          {/* Core dynamic content */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="py-24 flex justify-center"
              >
                <Spinner size="large" />
              </motion.div>
            ) : bookings.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-20 bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-900 rounded-3xl p-8 max-w-xl mx-auto shadow-sm space-y-5"
              >
                <div className="p-4 bg-slate-50 dark:bg-slate-900/60 text-slate-550 dark:text-slate-500 rounded-2xl w-fit mx-auto border border-slate-200 dark:border-slate-800">
                  <CalendarDays className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-300">No active bookings</h3>
                  <p className="text-xs text-slate-655 dark:text-slate-500 leading-relaxed max-w-xs mx-auto font-semibold">
                    You haven't scheduled any sports fields yet. Discover premium turfs and lock your slots now!
                  </p>
                </div>
                <Link
                  href="/facilities"
                  className="inline-flex bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95"
                >
                  Browse Sports Arenas
                </Link>
              </motion.div>
            ) : (
              <motion.div 
                key="grid"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {bookings.map((booking) => {
                  const facility = booking.facility_id;
                  if (!facility) return null;

                  return (
                    <motion.div 
                      key={booking._id} 
                      variants={itemVariants}
                      className="flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm hover:border-blue-500/25 dark:hover:border-blue-500/25 hover:shadow-md dark:hover:shadow-blue-500/5 transition-all duration-300"
                    >
                      
                      {/* Header Image section */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                        <img
                          src={getSafeImageSrc(facility.image)}
                          alt={facility.name}
                          className="h-full w-full object-cover"
                          onError={handleImageFallback}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                        
                        {/* Status Badges */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className={`px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-xl border ${statusColors[(booking.status || 'pending').toLowerCase()] || statusColors.pending} backdrop-blur-md`}>
                            {booking.status || 'pending'}
                          </span>
                        </div>
                      </div>

                      {/* Booking metadata */}
                      <div className="p-6 flex flex-col flex-grow space-y-4">
                        
                        <div className="space-y-1.5">
                          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 truncate">
                            {facility.name}
                          </h3>
                          <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs font-semibold">
                            <MapPin className="h-4 w-4 mr-2 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                            <span className="truncate">{facility.location}</span>
                          </div>
                        </div>

                        {/* Schedule cards */}
                        <div className="p-4 bg-slate-55 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-950 rounded-2xl space-y-3.5">
                          <div className="flex items-center text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
                            <Calendar className="h-4 w-4 mr-3 text-blue-600 dark:text-sky-400 flex-shrink-0" />
                            <span>Date: {formatBookingDate(booking.booking_date)}</span>
                          </div>
                          <div className="flex items-center text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
                            <Clock className="h-4 w-4 mr-3 text-blue-600 dark:text-sky-400 flex-shrink-0" />
                            <span>Slot: {booking.time_slot}</span>
                          </div>
                          <div className="flex items-center text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
                            <Clock className="h-4 w-4 mr-3 text-blue-600 dark:text-sky-400 flex-shrink-0" />
                            <span>Duration: {booking.hours} hours</span>
                          </div>
                        </div>

                        {/* Price Cancel row */}
                        <div className="flex justify-between items-center pt-2 mt-auto border-t border-slate-100 dark:border-slate-800/60 pt-4">
                          <div>
                            <span className="text-[9px] text-slate-500 dark:text-slate-500 uppercase font-bold tracking-wider block">Paid Price</span>
                            <span className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center leading-none mt-0.5">
                              <span className="text-xs font-bold text-blue-600 dark:text-sky-400 mr-0.5">$</span>
                              {booking.total_price}
                            </span>
                          </div>

                          <button
                            onClick={() => handleCancelClick(booking._id)}
                            className="flex items-center text-red-500 hover:text-red-650 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-red-500/20 active:scale-95"
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-2 text-red-500/80" />
                            Delete Booking
                          </button>
                        </div>

                      </div>

                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cancellation warning dialog modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmCancel}
            title="Cancel Match Schedule?"
            message="Are you sure you want to cancel this booking slot reservation? This will immediately free the sports turf time slot for other player groups."
            confirmText={cancelling ? 'Cancelling...' : 'Cancel Booking'}
            cancelText="Keep Match Slot"
            isDanger={true}
            size="sm"
            isLoading={cancelling}
          />

        </div>
      </div>
    </ProtectedRoute>
  );
}
