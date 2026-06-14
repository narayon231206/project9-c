'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Spinner from '@/components/Spinner';
import Modal from '@/components/Modal';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Trash2,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

const formatBookingDate = (value) => {
  if (!value) return 'Unknown date';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short'
  });
};

const getStatusConfig = (status) => {
  const configs = {
    pending: {
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      bgColor: 'bg-amber-500/5',
      icon: AlertCircle,
      label: 'Pending'
    },
    confirmed: {
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      bgColor: 'bg-emerald-500/5',
      icon: CheckCircle2,
      label: 'Confirmed'
    },
    cancelled: {
      color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
      bgColor: 'bg-red-500/5',
      icon: XCircle,
      label: 'Cancelled'
    },
  };
  return configs[status] || configs.pending;
};

export default function MyBookedSessionsPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal Cancel confirmation States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedBookingData, setSelectedBookingData] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const visibleBookings = bookings.filter(booking => booking.status !== 'cancelled');

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await api.get('/bookings/my-bookings');
      const nextBookings = Array.isArray(data) ? data : data.bookings;
      if (Array.isArray(nextBookings)) {
        setBookings(nextBookings.filter(booking => booking.tutorId));
      } else {
        setBookings([]);
      }
    } catch (error) {
      toast.error('Failed to load your booked sessions');
      setBookings([]);
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
  const handleCancelClick = (booking) => {
    setSelectedBookingId(booking._id);
    setSelectedBookingData(booking);
    setIsModalOpen(true);
  };

  // Perform Booking Cancel Call
  const handleConfirmCancel = async () => {
    if (!selectedBookingId) {
      toast.error('Booking ID missing. Please try again.');
      return;
    }

    try {
      setCancelling(true);
      
      console.log('Cancelling booking:', selectedBookingId);
      
      // IMPORTANT: Pass empty object {} as body for PATCH request
      const res = await api.patch(`/bookings/${selectedBookingId}/cancel`, {});
      
      console.log('Cancel response:', res);
      
      if (res && (res.success || res.booking)) {
        toast.success(res.message || 'Session cancelled successfully! The slot is now available for other students.');
        
        // Remove cancelled booking from display
        setBookings(prev => prev.filter(b => b._id !== selectedBookingId));
        
        // Close modal with slight delay for toast visibility
        setTimeout(() => {
          setIsModalOpen(false);
          setSelectedBookingId(null);
          setSelectedBookingData(null);
        }, 500);
      } else {
        const errorMsg = res?.message || 'Failed to cancel session. Please try again.';
        console.error('Cancel failed:', errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Cancel error:', error);
      
      // Provide specific error messages based on error type
      let userMessage = 'Failed to cancel session. Please try again.';
      
      if (error.message.includes('already cancelled')) {
        userMessage = 'This session is already cancelled.';
      } else if (error.message.includes('Not authorized')) {
        userMessage = 'You are not authorized to cancel this booking.';
      } else if (error.message.includes('not found')) {
        userMessage = 'Booking not found. It may have already been cancelled.';
      } else if (error.message) {
        userMessage = error.message;
      }
      
      toast.error(userMessage);
    } finally {
      setCancelling(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex-grow bg-slate-50 dark:bg-[#070b19] py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-250 relative min-h-screen">
        
        <div className="hidden dark:block absolute top-0 right-1/4 w-[350px] h-[350px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-10 relative z-10">
          
          {/* Header section */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-8">
            <div className="space-y-3">
              <span className="text-blue-600 dark:text-sky-400 font-extrabold text-xs uppercase tracking-widest block">Student Dashboard</span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">My Booked Sessions</h1>
              <p className="text-slate-650 dark:text-slate-400 text-xs sm:text-sm font-semibold max-w-xl">
                View and manage all your booked tutor sessions.
              </p>
            </div>
          </div>

          {/* Content */}
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
            ) : !isAuthenticated ? (
              <motion.div 
                key="not-auth"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-lg font-bold text-slate-700 dark:text-slate-300">Please login to view your bookings</p>
              </motion.div>
            ) : visibleBookings.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-20 bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-900 rounded-3xl p-8 max-w-xl mx-auto shadow-sm space-y-5"
              >
                <div className="p-4 bg-slate-50 dark:bg-slate-900/60 text-slate-455 dark:text-slate-500 rounded-2xl w-fit mx-auto border border-slate-200 dark:border-slate-800">
                  <Calendar className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-350">No bookings yet</h3>
                  <p className="text-xs text-slate-650 dark:text-slate-500 leading-relaxed max-w-xs mx-auto font-semibold">
                    You haven't booked any sessions yet. Browse tutors and book your first session!
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="cards"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {visibleBookings.map(booking => {
                  const statusConfig = getStatusConfig(booking.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <motion.div
                      key={booking._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                    >
                      {/* Status Badge */}
                      <div className={`absolute top-0 right-0 px-4 py-2 text-xs font-extrabold uppercase tracking-widest rounded-bl-2xl border-l border-b ${statusConfig.color}`}>
                        {statusConfig.label}
                      </div>

                      {/* Content */}
                      <div className="p-8 space-y-6">
                        
                        {/* Header: Tutor Name + Status Icon */}
                        <div className="space-y-2">
                          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                            {booking.tutorName}
                          </h3>
                          <div className="flex items-center gap-2">
                            <StatusIcon className="h-4 w-4" />
                            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                              {statusConfig.label} Session
                            </p>
                          </div>
                        </div>

                        {/* Main Info Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          
                          {/* Student Name */}
                          <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                              <User className="h-4 w-4" />
                              Student
                            </div>
                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{booking.studentName}</p>
                          </div>

                          {/* Booking Date */}
                          <div className="space-y-1.5 p-4 rounded-2xl bg-blue-500/5 dark:bg-blue-950/30 border border-blue-500/20">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                              <Calendar className="h-4 w-4" />
                              Date
                            </div>
                            <p className="text-sm font-bold text-blue-900 dark:text-blue-100">{formatBookingDate(booking.bookingDate)}</p>
                          </div>

                          {/* Student Email */}
                          <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                              <Mail className="h-4 w-4" />
                              Email
                            </div>
                            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{booking.studentEmail}</p>
                          </div>

                          {/* Phone Number */}
                          <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                              <Phone className="h-4 w-4" />
                              Phone
                            </div>
                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{booking.phone}</p>
                          </div>
                        </div>

                        {/* Booking Reference & Timestamps */}
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-600 dark:text-slate-400 font-semibold">Booking ID:</span>
                            <span className="text-slate-900 dark:text-slate-100 font-mono text-[10px]">{booking._id}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-600 dark:text-slate-400 font-semibold">Booked On:</span>
                            <span className="text-slate-900 dark:text-slate-100 font-semibold">
                              {new Date(booking.createdAt).toLocaleDateString()} {new Date(booking.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                            </span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <button
                          onClick={() => handleCancelClick(booking)}
                          className="w-full px-4 py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 hover:border-red-500/40 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Cancel Session
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Cancel Session"
        size="md"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 active:scale-95 shadow-sm"
            >
              Keep Session
            </button>
            <button 
              onClick={handleConfirmCancel}
              disabled={cancelling}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-md"
            >
              {cancelling ? 'Cancelling...' : 'Yes, Cancel Session'}
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          {selectedBookingData && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800/80 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Booking Details</p>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Tutor: <span className="text-blue-600 dark:text-sky-400">{selectedBookingData.tutorName}</span></p>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Date: <span className="text-blue-600 dark:text-sky-400">{formatBookingDate(selectedBookingData.bookingDate)}</span></p>
              </div>
            </div>
          )}
          <p className="text-xs sm:text-sm text-slate-655 dark:text-slate-400 font-semibold leading-relaxed">
            Are you sure you want to cancel this session? The tutor slot will be made available again and this action cannot be undone.
          </p>
        </div>
      </Modal>
    </ProtectedRoute>
  );
}

