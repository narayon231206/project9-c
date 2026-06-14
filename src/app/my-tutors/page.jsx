'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Spinner from '@/components/Spinner';
import Modal from '@/components/Modal';
import FormSection from '@/components/FormSection';
import FormField from '@/components/FormField';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusCircle,
  Edit2,
  Trash2,
  X,
  Sliders,
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  CalendarDays,
  Clock,
  DollarSign,
  GraduationCap,
  MapPin,
  Monitor,
  Users,
} from 'lucide-react';
import { getSafeImageSrc, handleImageFallback } from '@/utils/images';

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const timeSlots = [
  '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
  '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00',
  '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00',
  '20:00 - 21:00'
];

const teachingModes = [
  { label: 'Online', value: 'Online' },
  { label: 'Offline', value: 'Offline' },
  { label: 'Hybrid', value: 'Hybrid' }
];

const subjects = [
  'Mathematics', 'Physics', 'Chemistry', 'English', 'Biology', 'History', 'Computer Science', 'Economics'
];

const formatList = (value, fallback = 'Not set') => {
  if (Array.isArray(value) && value.length > 0) {
    return value.join(', ');
  }

  return value || fallback;
};

export default function MyTutorsPage() {
  const { user } = useAuth();
  const [myTutors, setMyTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Delete Modal States
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTutorId, setSelectedTutorId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Edit Modal States
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTutor, setEditTutor] = useState(null);
  const [editDays, setEditDays] = useState([]);
  const [editTimeSlots, setEditTimeSlots] = useState([]);
  const [updating, setUpdating] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm();
  const tutorPhotoUrl = watch('tutorPhoto');

  const fetchMyTutors = async () => {
    try {
      setLoading(true);
      const data = await api.get('/tutors/my-tutors');
      if (data.success && data.tutors) {
        setMyTutors(data.tutors);
      }
    } catch (error) {
      toast.error('Failed to load your tutors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyTutors();
    }
  }, [user]);

  // Handle Edit Click
  const handleEditClick = (tutor) => {
    setEditTutor(tutor);
    setEditDays(tutor.availableDays || []);
    setEditTimeSlots(tutor.availableTimeSlot || tutor.availableTimeSlots || []);

    setValue('tutorName', tutor.tutorName);
    setValue('tutorPhoto', tutor.tutorPhoto);
    setValue('subject', tutor.subject);
    setValue('institution', tutor.institution);
    setValue('hourlyFee', tutor.hourlyFee);
    setValue('totalSlot', tutor.totalSlot);
    setValue('location', tutor.location);
    setValue('experience', tutor.experience);
    setValue('teachingMode', tutor.teachingMode);

    setIsEditOpen(true);
  };

  const totalSlots = myTutors.reduce((sum, tutor) => sum + Number(tutor.totalSlot || 0), 0);
  const averageFee = myTutors.length
    ? Math.round(myTutors.reduce((sum, tutor) => sum + Number(tutor.hourlyFee || 0), 0) / myTutors.length)
    : 0;
  const subjectCount = new Set(myTutors.map(tutor => tutor.subject).filter(Boolean)).size;
  const teachingModeCount = new Set(myTutors.map(tutor => tutor.teachingMode).filter(Boolean)).size;

  const dashboardStats = [
    {
      label: 'Tutor Profiles',
      value: myTutors.length,
      icon: GraduationCap,
      color: 'text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-blue-500/10'
    },
    {
      label: 'Open Slots',
      value: totalSlots,
      icon: Users,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10'
    },
    {
      label: 'Avg. Fee',
      value: `$${averageFee}`,
      icon: DollarSign,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10'
    },
    {
      label: 'Subjects',
      value: subjectCount,
      icon: BookOpen,
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10'
    }
  ];

  const handleEditDayToggle = (day) => {
    if (editDays.includes(day)) {
      setEditDays(prev => prev.filter(d => d !== day));
    } else {
      setEditDays(prev => [...prev, day]);
    }
  };

  const handleEditTimeSlotToggle = (slot) => {
    if (editTimeSlots.includes(slot)) {
      setEditTimeSlots(prev => prev.filter(s => s !== slot));
    } else {
      setEditTimeSlots(prev => [...prev, slot]);
    }
  };

  const onEditSubmit = async (data) => {
    if (editDays.length === 0) {
      toast.error('Please select at least one day.');
      return;
    }
    if (editTimeSlots.length === 0) {
      toast.error('Please select at least one time slot.');
      return;
    }

    try {
      setUpdating(true);
      const payload = {
        ...data,
        hourlyFee: Number(data.hourlyFee),
        totalSlot: Number(data.totalSlot),
        availableDays: editDays,
        availableTimeSlot: editTimeSlots,
      };

      const res = await api.patch(`/tutors/${editTutor._id}`, payload);
      if (res.success) {
        toast.success(res.message || 'Tutor updated successfully!');
        setMyTutors(prev => prev.map(t => t._id === editTutor._id ? res.tutor : t));
        setIsEditOpen(false);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update tutor');
    } finally {
      setUpdating(false);
    }
  };

  // Handle Delete Click
  const handleDeleteClick = (id) => {
    setSelectedTutorId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      const res = await api.delete(`/tutors/${selectedTutorId}`);
      if (res.success) {
        toast.success(res.message || 'Tutor deleted successfully!');
        setMyTutors(prev => prev.filter(t => t._id !== selectedTutorId));
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete tutor');
    } finally {
      setIsDeleteOpen(false);
      setSelectedTutorId(null);
      setDeleting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex-grow bg-white dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-250 relative min-h-screen">

        <div className="max-w-7xl mx-auto space-y-8 relative z-10">

          {/* Header Section - Clean and Professional */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">My Tutors</h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium max-w-lg">
                Manage your teaching profiles and monitor student bookings.
              </p>
            </div>
            <Link
              href="/add-tutor"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all active:scale-95 whitespace-nowrap"
            >
              <PlusCircle className="h-4 w-4" />
              Add Tutor
            </Link>
          </div>

          {/* Stats Grid - Clean and Minimal */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {dashboardStats.map((stat) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800/50 dark:bg-slate-900/30"
                  style={{
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-400">{stat.label}</p>
                      <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                    </div>
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${stat.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 flex justify-center"
              >
                <Spinner size="large" />
              </motion.div>
            ) : myTutors.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-16 bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/50 rounded-2xl p-8 max-w-md mx-auto space-y-4"
              >
                <div className="p-3 bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-600 rounded-xl w-fit mx-auto border border-slate-200 dark:border-slate-800">
                  <Sliders className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No tutors yet</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto mt-2">
                    Create your first tutor profile to start accepting student bookings.
                  </p>
                </div>
                <Link
                  href="/add-tutor"
                  className="inline-flex bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all active:scale-95 mt-4"
                >
                  Create Your First Profile
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="cards"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-5"
              >
                {myTutors.map(tutor => {
                  const timeSlots = tutor.availableTimeSlot || tutor.availableTimeSlots;

                  return (
                    <motion.article
                      key={tutor._id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800/50 dark:bg-slate-900/40 dark:hover:border-slate-700/50"
                      style={{
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
                      }}
                    >
                      <div className="flex flex-col sm:flex-row">
                        {/* Image Section */}
                        <div className="relative w-full sm:w-40 h-40 bg-slate-100 dark:bg-slate-950 shrink-0">
                          <img
                            src={getSafeImageSrc(tutor.tutorPhoto)}
                            alt={tutor.tutorName}
                            className="h-full w-full object-cover"
                            onError={handleImageFallback}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-50" />
                          <span className="absolute left-3 top-3 rounded-md bg-white/90 dark:bg-slate-900/90 px-2 py-1 text-xs font-medium text-slate-800 dark:text-slate-200">
                            {tutor.subject}
                          </span>
                          {tutor.teachingMode && (
                            <span className="absolute bottom-3 left-3 rounded-md bg-blue-600/90 px-2 py-1 text-xs font-medium text-white">
                              {tutor.teachingMode}
                            </span>
                          )}
                        </div>

                        {/* Content Section */}
                        <div className="flex flex-col flex-grow p-4 sm:p-5">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="min-w-0">
                              <h2 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-1">{tutor.tutorName}</h2>
                              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-1 flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5 shrink-0" />
                                {tutor.location || 'Location not set'}
                              </p>
                            </div>
                            <div className="shrink-0 rounded-lg bg-blue-50 dark:bg-blue-500/10 px-3 py-2 text-right">
                              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Fee/Hr</p>
                              <p className="text-lg font-bold text-blue-700 dark:text-blue-300">${tutor.hourlyFee || 0}</p>
                            </div>
                          </div>

                          {/* Info Grid */}
                          <div className="grid grid-cols-3 gap-2 my-3 text-xs">
                            <div className="rounded-lg bg-slate-50 dark:bg-slate-800/30 p-2.5">
                              <p className="text-slate-600 dark:text-slate-400 font-medium">Slots</p>
                              <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">{tutor.totalSlot || 0}</p>
                            </div>
                            <div className="rounded-lg bg-slate-50 dark:bg-slate-800/30 p-2.5">
                              <p className="text-slate-600 dark:text-slate-400 font-medium">Days</p>
                              <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">{Array.isArray(tutor.availableDays) ? tutor.availableDays.length : 0}</p>
                            </div>
                            <div className="rounded-lg bg-slate-50 dark:bg-slate-800/30 p-2.5">
                              <p className="text-slate-600 dark:text-slate-400 font-medium">Times</p>
                              <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">{Array.isArray(timeSlots) ? timeSlots.length : 0}</p>
                            </div>
                          </div>

                          {/* Additional Info */}
                          <div className="space-y-1.5 text-xs mb-4 text-slate-600 dark:text-slate-400">
                            {tutor.institution && (
                              <p className="flex items-start gap-2">
                                <Award className="h-3.5 w-3.5 mt-0.5 shrink-0 text-slate-400 dark:text-slate-500" />
                                <span className="line-clamp-1">{tutor.institution}</span>
                              </p>
                            )}
                            {tutor.experience && (
                              <p className="flex items-start gap-2">
                                <GraduationCap className="h-3.5 w-3.5 mt-0.5 shrink-0 text-slate-400 dark:text-slate-500" />
                                <span>{tutor.experience}</span>
                              </p>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                            <Link
                              href={`/tutors/${tutor._id}`}
                              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-3 py-2 text-xs font-semibold text-white transition-all active:scale-95"
                            >
                              <BookOpen className="h-3.5 w-3.5" />
                              Profile
                            </Link>
                            <button
                              onClick={() => handleEditClick(tutor)}
                              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/50 dark:hover:bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all active:scale-95"
                              title="Edit"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteClick(tutor._id)}
                              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 px-3 py-2 text-xs font-semibold text-red-700 dark:text-red-300 transition-all active:scale-95"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Edit Modal - Modern Dashboard Style */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Tutor Profile"
        size="5xl"
        closeOnOverlayClick={false}
        stickyHeader={true}
        stickyFooter={true}
        footer={
          <div className="flex gap-3 justify-end w-full">
            <button
              type="button"
              onClick={() => setIsEditOpen(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(onEditSubmit)}
              disabled={updating}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50"
            >
              {updating ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Profile'
              )}
            </button>
          </div>
        }
      >
        <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              
              {/* Basic Information */}
              <FormSection title="Basic Info" icon={GraduationCap}>
                <FormField label="Tutor Name" error={errors.tutorName} required={true}>
                  <input
                    type="text"
                    placeholder="Enter tutor name"
                    {...register('tutorName', { required: 'Name is required' })}
                  />
                </FormField>
                
                <FormField label="Photo URL" error={errors.tutorPhoto} required={true}>
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    {...register('tutorPhoto', { required: 'Photo URL is required' })}
                  />
                </FormField>

                {tutorPhotoUrl && (
                  <div className="relative w-24 h-24 mx-auto rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center">
                    <img
                      src={tutorPhotoUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )}
              </FormSection>

              {/* Education */}
              <FormSection title="Education" icon={BookOpen}>
                <FormField label="Subject" error={errors.subject} required={true}>
                  <select {...register('subject', { required: 'Subject is required' })}>
                    <option value="">Select a subject</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>

                <FormField label="Experience" error={errors.experience} required={true}>
                  <input
                    type="text"
                    placeholder="e.g. 5 years"
                    {...register('experience', { required: 'Experience is required' })}
                  />
                </FormField>

                <FormField label="Institution" error={errors.institution} required={true}>
                  <input
                    type="text"
                    placeholder="e.g. Harvard University"
                    {...register('institution', { required: 'Institution is required' })}
                  />
                </FormField>
              </FormSection>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              
              {/* Pricing & Location */}
              <FormSection title="Pricing & Location" icon={DollarSign}>
                <FormField label="Hourly Fee ($)" error={errors.hourlyFee} required={true}>
                  <input
                    type="number"
                    placeholder="50"
                    {...register('hourlyFee', { required: 'Hourly fee is required', min: 1 })}
                  />
                </FormField>

                <FormField label="Available Slots" error={errors.totalSlot} required={true}>
                  <input
                    type="number"
                    placeholder="10"
                    {...register('totalSlot', { required: 'Slot count is required', min: 1 })}
                  />
                </FormField>

                <FormField label="Teaching Mode" error={errors.teachingMode} required={true}>
                  <select {...register('teachingMode', { required: 'Teaching mode is required' })}>
                    <option value="">Select mode</option>
                    {teachingModes.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                  </select>
                </FormField>

                <FormField label="Location" error={errors.location} required={true}>
                  <input
                    type="text"
                    placeholder="e.g. New York, NY"
                    {...register('location', { required: 'Location is required' })}
                  />
                </FormField>
              </FormSection>

              {/* Available Days */}
              <FormSection title="Available Days" icon={CalendarDays}>
                <div className="grid grid-cols-4 gap-1.5">
                  {daysOfWeek.map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleEditDayToggle(day)}
                      className={`px-2 py-2 rounded-md text-xs font-medium transition-all ${editDays.includes(day)
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500/50'
                        }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </FormSection>
            </div>

          </div>

          {/* Time Slots - Full Width */}
          <FormSection title="Available Time Slots" icon={Clock}>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 max-h-48 overflow-y-auto pr-2">
              {timeSlots.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => handleEditTimeSlotToggle(slot)}
                  className={`px-2 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${editTimeSlots.includes(slot)
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/50'
                    }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </FormSection>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Tutor Profile?"
        message="Are you sure you want to delete this tutor profile? This action will permanently erase the tutor from your listing board and cannot be undone."
        confirmText={deleting ? 'Deleting...' : 'Delete Tutor'}
        cancelText="Keep Profile"
        isDanger={true}
        size="sm"
        isLoading={deleting}
      />
    </ProtectedRoute>
  );
}
