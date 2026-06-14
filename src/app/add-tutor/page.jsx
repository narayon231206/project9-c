'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { api } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Spinner from '@/components/Spinner';
import { isHttpUrl } from '@/utils/images';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { PlusCircle, Info, Image, MapPin, Users, Clock, AlignLeft, Calendar, DollarSign, BookOpen } from 'lucide-react';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const timeSlots = [
  '08:00 - 09:00',
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
  '17:00 - 18:00',
  '18:00 - 19:00',
  '19:00 - 20:00',
  '20:00 - 21:00',
];

const teachingModes = [
  { label: 'Online', value: 'Online' },
  { label: 'Offline', value: 'Offline' },
  { label: 'Hybrid', value: 'Hybrid' },
];

const subjects = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'English',
  'Biology',
  'History',
  'Computer Science',
  'Economics',
];

export default function AddTutorPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [submitting, setSubmitting] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: 'Mathematics',
      hourlyFee: 20,
      totalSlot: 10,
      teachingMode: 'Online',
    }
  });

  // Toggle Day selection
  const handleDayToggle = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(prev => prev.filter(d => d !== day));
    } else {
      setSelectedDays(prev => [...prev, day]);
    }
  };

  // Toggle Time Slot selection
  const handleSlotToggle = (slot) => {
    if (selectedTimeSlots.includes(slot)) {
      setSelectedTimeSlots(prev => prev.filter(s => s !== slot));
    } else {
      setSelectedTimeSlots(prev => [...prev, slot]);
    }
  };

  const onSubmit = async (data) => {
    // Validate that at least one day is selected
    if (selectedDays.length === 0) {
      toast.error('Please select at least one available day.');
      return;
    }

    // Validate that at least one time slot is selected
    if (selectedTimeSlots.length === 0) {
      toast.error('Please select at least one available time slot.');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        ...data,
        hourlyFee: Number(data.hourlyFee),
        totalSlot: Number(data.totalSlot),
        availableDays: selectedDays,
        availableTimeSlot: selectedTimeSlots,
        sessionStartDate: new Date(data.sessionStartDate),
      };

      const res = await api.post('/tutors', payload);
      if (res.success) {
        toast.success(res.message || 'Tutor profile created successfully!');
        router.push('/my-tutors');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to create tutor profile');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitting) {
    return (
      <div className="flex-grow flex justify-center items-center py-28 bg-slate-50 dark:bg-[#070b19]">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex-grow bg-slate-50 dark:bg-[#070b19] py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-250 relative min-h-screen">
        
        {/* Ambient background glows (only dark mode) */}
        <div className="hidden dark:block absolute top-0 right-1/4 w-[350px] h-[350px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-10 relative z-10">
          
          {/* Header titles */}
          <div className="text-center space-y-3">
            <span className="text-blue-600 dark:text-sky-400 font-extrabold text-xs uppercase tracking-widest block">Tutor Dashboard</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">Create Your Tutor Profile</h1>
            <p className="text-slate-650 dark:text-slate-400 text-xs sm:text-sm max-w-md mx-auto font-semibold leading-relaxed">
              Share your expertise, set your hourly rate, and connect with eager students ready to learn.
            </p>
          </div>

          {/* Creation Form Box */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900/60 p-8 rounded-3xl border border-slate-200 dark:border-slate-800/60 shadow-sm dark:shadow-xl backdrop-blur-md"
          >
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Creator Email (Auto-filled read-only) */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Your Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-450 dark:text-slate-500 border border-slate-200 dark:border-slate-900 focus:outline-none font-bold text-xs tracking-wider select-none"
                />
              </div>

              {/* Grid 1: Name and Photo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Tutor Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Tutor Name</label>
                  <div className="relative">
                    <PlusCircle className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-455 dark:text-slate-500 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Dr. John Smith"
                      {...register('tutorName', { required: 'Tutor name is required' })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider"
                    />
                  </div>
                  {errors.tutorName && <p className="text-red-500 text-xs">{errors.tutorName.message}</p>}
                </div>

                {/* Photo URL */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Photo URL</label>
                  <div className="relative">
                    <Image className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-455 dark:text-slate-500 pointer-events-none" />
                    <input
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      {...register('tutorPhoto', { 
                        required: 'Photo URL is required',
                        pattern: {
                          value: /^https?:\/\//i,
                          message: 'Please enter a valid HTTP/HTTPS URL'
                        }
                      })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider"
                    />
                  </div>
                  {errors.tutorPhoto && <p className="text-red-500 text-xs">{errors.tutorPhoto.message}</p>}
                </div>
              </div>

              {/* Grid 2: Subject and Institution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Subject</label>
                  <select
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider"
                  >
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                {/* Institution */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Institution</label>
                  <div className="relative">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-455 dark:text-slate-500 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="ABC University"
                      {...register('institution', { required: 'Institution is required' })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider"
                    />
                  </div>
                  {errors.institution && <p className="text-red-500 text-xs">{errors.institution.message}</p>}
                </div>
              </div>

              {/* Grid 3: Fee, Slots, and Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Hourly Fee */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Hourly Fee ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-455 dark:text-slate-500 pointer-events-none" />
                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="25"
                      {...register('hourlyFee', { required: 'Hourly fee is required', min: 1 })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider"
                    />
                  </div>
                  {errors.hourlyFee && <p className="text-red-500 text-xs">{errors.hourlyFee.message}</p>}
                </div>

                {/* Total Slots */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Total Slots</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-455 dark:text-slate-500 pointer-events-none" />
                    <input
                      type="number"
                      min="1"
                      placeholder="10"
                      {...register('totalSlot', { required: 'Total slots required', min: 1 })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider"
                    />
                  </div>
                  {errors.totalSlot && <p className="text-red-500 text-xs">{errors.totalSlot.message}</p>}
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-455 dark:text-slate-500 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="New York, NY"
                      {...register('location', { required: 'Location is required' })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider"
                    />
                  </div>
                  {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
                </div>
              </div>

              {/* Experience and Teaching Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Experience */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Experience (Years)</label>
                  <input
                    type="text"
                    placeholder="5+ years"
                    {...register('experience', { required: 'Experience is required' })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider"
                  />
                  {errors.experience && <p className="text-red-500 text-xs">{errors.experience.message}</p>}
                </div>

                {/* Teaching Mode */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Teaching Mode</label>
                  <select
                    {...register('teachingMode', { required: 'Teaching mode is required' })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider"
                  >
                    {teachingModes.map(mode => (
                      <option key={mode.value} value={mode.value}>{mode.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Session Start Date */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Session Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-455 dark:text-slate-500 pointer-events-none" />
                  <input
                    type="date"
                    {...register('sessionStartDate', { required: 'Session start date is required' })}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs"
                  />
                </div>
                {errors.sessionStartDate && <p className="text-red-500 text-xs">{errors.sessionStartDate.message}</p>}
              </div>

              {/* Available Days */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Available Days</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {daysOfWeek.map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                        selectedDays.includes(day)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Available Time Slots */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Available Time Slots</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {timeSlots.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleSlotToggle(slot)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                        selectedTimeSlots.includes(slot)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 dark:from-blue-600 dark:to-sky-500 text-white font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-50"
              >
                {submitting ? 'Creating...' : 'Create Tutor Profile'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
