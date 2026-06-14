'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { api } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';
import Spinner from '@/components/Spinner';
import { getSafeImageSrc, handleImageFallback } from '@/utils/images';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Users, 
  Clock, 
  BookOpen, 
  Calendar, 
  ArrowLeft,
  CalendarCheck,
  Info,
  DollarSign,
  Award,
  Phone,
} from 'lucide-react';

export default function TutorDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState(user?.name || '');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Get today's date formatted as YYYY-MM-DD to lock calendar inputs
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await api.get(`/tutors/${id}`);
        if (data.success && data.tutor) {
          setTutor(data.tutor);
        }
      } catch (error) {
        toast.error('Failed to load tutor details');
        router.push('/tutors');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, router]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // 1. Auth check: Redirect to login if not authenticated
    if (!isAuthenticated) {
      toast.error('Please login to book a session.');
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    // 2. Validate inputs
    if (!studentName.trim()) {
      toast.error('Please enter your name.');
      return;
    }
    if (!phoneNumber.trim()) {
      toast.error('Please enter your phone number.');
      return;
    }
    if (!bookingDate) {
      toast.error('Please select a booking date.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post('/bookings', {
        tutorId: id,
        studentName,
        phone: phoneNumber,
        bookingDate,
      });

      if (res.success) {
        toast.success(res.message || 'Session booked successfully!');
        router.push('/my-booked-sessions');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to book session');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-grow flex justify-center items-center py-28 bg-slate-50 dark:bg-[#070b19]">
        <Spinner size="large" />
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="flex-grow flex flex-col justify-center items-center py-20 bg-slate-50 dark:bg-[#070b19] text-slate-800 dark:text-slate-300">
        <p className="text-lg font-bold">Tutor not found</p>
        <button onClick={() => router.push('/tutors')} className="mt-4 bg-blue-600 hover:bg-blue-755 text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-sm">
          Back to Tutors
        </button>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-slate-50 dark:bg-[#070b19] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-250 relative min-h-screen">
      
      {/* Background glow meshes (only dark mode) */}
      <div className="hidden dark:block absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Back Link */}
        <button
          onClick={() => router.push('/tutors')}
          className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
        >
          <ArrowLeft className="h-4.5 w-4.5 mr-2" />
          Back to tutors
        </button>

        {/* Master Details layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT Columns - Tutor details, description */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tutor Image Showcase */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-video w-full overflow-hidden rounded-3xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800"
            >
              <img
                src={getSafeImageSrc(tutor.tutorPhoto)}
                alt={tutor.tutorName}
                className="h-full w-full object-cover"
                onError={handleImageFallback}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 z-10">
                <span className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-blue-600 text-white">
                  {tutor.subject}
                </span>
              </div>
            </motion.div>

            {/* Tutor Info Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800/60 shadow-sm space-y-6"
            >
              
              {/* Header with Name and Teaching Mode */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                  {tutor.tutorName}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {tutor.teachingMode} Mode
                  </span>
                  {tutor.totalSlot > 0 && (
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                      {tutor.totalSlot} Slots Available
                    </span>
                  )}
                  {tutor.totalSlot === 0 && (
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                      Fully Booked
                    </span>
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/5 to-blue-600/5 dark:from-blue-950/40 dark:to-blue-900/40 border border-blue-500/10 dark:border-blue-500/20">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Hourly Fee</div>
                  <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">${tutor.hourlyFee}</div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-green-600/5 dark:from-emerald-950/40 dark:to-emerald-900/40 border border-emerald-500/10 dark:border-emerald-500/20">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Experience</div>
                  <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{tutor.experience}</div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/5 to-amber-600/5 dark:from-orange-950/40 dark:to-orange-900/40 border border-orange-500/10 dark:border-orange-500/20">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Institution</div>
                  <div className="text-xl font-bold text-orange-600 dark:text-orange-400 mt-1 truncate">{tutor.institution}</div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-600/5 dark:from-purple-950/40 dark:to-pink-900/40 border border-purple-500/10 dark:border-purple-500/20">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Location</div>
                  <div className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-1 truncate">{tutor.location}</div>
                </div>
              </div>

              {/* Details Section */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                
                {/* Available Days */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Available Days</h3>
                  <div className="flex flex-wrap gap-2">
                    {tutor.availableDays?.map(day => (
                      <span key={day} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Available Time Slots */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Available Time Slots</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {tutor.availableTimeSlot?.map(slot => (
                      <span key={slot} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT Column - Booking Form */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800/60 shadow-sm"
            >
              
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">Book a Session</h2>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                
                {/* Tutor ID (Auto-filled read-only) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Tutor ID</label>
                  <input
                    type="text"
                    value={tutor._id}
                    readOnly
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-450 dark:text-slate-500 border border-slate-200 dark:border-slate-900 font-bold text-xs select-none"
                  />
                </div>

                {/* Tutor Name (Auto-filled read-only) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Tutor Name</label>
                  <input
                    type="text"
                    value={tutor.tutorName}
                    readOnly
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-450 dark:text-slate-500 border border-slate-200 dark:border-slate-900 font-bold text-xs select-none"
                  />
                </div>

                {/* Student Email (Auto-filled read-only) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Your Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-450 dark:text-slate-500 border border-slate-200 dark:border-slate-900 font-bold text-xs select-none"
                  />
                </div>

                {/* Student Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Your Name</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 font-semibold text-xs"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 font-semibold text-xs"
                    />
                  </div>
                </div>

                {/* Booking Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Booking Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min={todayStr}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 font-semibold text-xs"
                    />
                  </div>
                </div>

                {/* Booking Status (Auto-generated as pending) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Booking Status</label>
                  <input
                    type="text"
                    value="Pending"
                    readOnly
                    className="w-full px-4 py-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold text-xs select-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting || tutor.totalSlot === 0}
                  className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-600 text-white dark:text-slate-100 font-bold text-xs uppercase tracking-widest transition-all disabled:cursor-not-allowed"
                >
                  {submitting ? 'Booking...' : tutor.totalSlot === 0 ? 'Session Fully Booked' : 'Confirm Booking'}
                </button>

                {tutor.totalSlot === 0 && (
                  <div className="p-3 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-bold">
                    This session is fully booked. You can't join at the moment.
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
