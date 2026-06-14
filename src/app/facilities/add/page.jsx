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
import { PlusCircle, Info, Image, MapPin, Users, Clock, AlignLeft } from 'lucide-react';

const presetSlots = [
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
  '21:00 - 22:00',
];

const sportTypes = [
  { label: 'Football', value: 'football' },
  { label: 'Cricket', value: 'cricket' },
  { label: 'Badminton', value: 'badminton' },
  { label: 'Tennis', value: 'tennis' },
  { label: 'Basketball', value: 'basketball' },
  { label: 'Swimming', value: 'swimming' },
];

export default function AddFacilityPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [submitting, setSubmitting] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      facility_type: 'football',
      price_per_hour: 10,
      capacity: 10,
    }
  });

  // Toggle Time Slot selection
  const handleSlotToggle = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(prev => prev.filter(s => s !== slot));
    } else {
      setSelectedSlots(prev => [...prev, slot]);
    }
  };

  const onSubmit = async (data) => {
    // Validate that at least one slot is selected
    if (selectedSlots.length === 0) {
      toast.error('Please check at least one available scheduling slot.');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        ...data,
        price_per_hour: Number(data.price_per_hour),
        capacity: Number(data.capacity),
        available_slots: selectedSlots,
      };

      const res = await api.post('/facilities', payload);
      if (res.success) {
        toast.success(res.message || 'Sports facility listed successfully!');
        router.push('/facilities/manage');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to list facility');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex-grow bg-slate-55 dark:bg-[#070b19] py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-250 relative min-h-screen">
        
        {/* Ambient background glows (only dark mode) */}
        <div className="hidden dark:block absolute top-0 right-1/4 w-[350px] h-[350px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-10 relative z-10">
          
          {/* Header titles */}
          <div className="text-center space-y-3">
            <span className="text-blue-600 dark:text-sky-400 font-extrabold text-xs uppercase tracking-widest block">Host Dashboard</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">List Sports Facility</h1>
            <p className="text-slate-650 dark:text-slate-400 text-xs sm:text-sm max-w-md mx-auto font-semibold leading-relaxed">
              Share details of your sports fields, set custom hourly prices, and coordinate bookings schedules.
            </p>
          </div>

          {/* Creation Form Box */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900/60 p-8 rounded-3xl border border-slate-200 dark:border-slate-800/60 shadow-sm dark:shadow-xl backdrop-blur-md"
          >
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Owner Email (Auto-filled read-only) */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Owner Contact Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-450 dark:text-slate-500 border border-slate-200 dark:border-slate-900 focus:outline-none font-bold text-xs tracking-wider select-none"
                />
              </div>

              {/* Grid 1: Name and Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Facility Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Facility Name</label>
                  <div className="relative">
                    <PlusCircle className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-455 dark:text-slate-500 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Basudebpur Football Field"
                      {...register('name', { required: 'Facility name is required' })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider"
                    />
                  </div>
                  {errors.name && (
                    <span className="text-[10px] text-red-500 font-bold block mt-1">{errors.name.message}</span>
                  )}
                </div>

                {/* Sport Type */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Sport Category</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-455 dark:text-slate-500 pointer-events-none" />
                    <select
                      {...register('facility_type', { required: 'Sport category is required' })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider appearance-none cursor-pointer"
                    >
                      {sportTypes.map((type) => (
                        <option key={type.value} value={type.value} className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>

              {/* Grid 2: Location and Image URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Physical Location */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Physical Address / Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-455 dark:text-slate-500 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Basudebpur, Chirirbandar, Dinajpur"
                      {...register('location', { required: 'Location is required' })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider"
                    />
                  </div>
                  {errors.location && (
                    <span className="text-[10px] text-red-500 font-bold block mt-1">{errors.location.message}</span>
                  )}
                </div>

                {/* Photo URL */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Photo Cover URL</label>
                  <div className="relative">
                    <Image className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-455 dark:text-slate-500 pointer-events-none" />
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/photo-..."
                      {...register('image', {
                        required: 'Photo URL is required',
                        validate: (value) => isHttpUrl(value) || 'Photo URL must start with http:// or https://',
                      })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs tracking-wider"
                    />
                  </div>
                  {errors.image && (
                    <span className="text-[10px] text-red-500 font-bold block mt-1">{errors.image.message}</span>
                  )}
                </div>

              </div>

              {/* Grid 3: Price rate and Capacity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Pricing Hourly */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Hourly Rate ($)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-450 dark:text-slate-500">$</span>
                    <input
                      type="number"
                      min="1"
                      placeholder="15"
                      {...register('price_per_hour', { 
                        required: 'Hourly rate is required',
                        min: { value: 1, message: 'Price must be a positive number greater than zero' }
                      })}
                      className="w-full pl-9 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-bold text-xs uppercase tracking-wider"
                    />
                  </div>
                  {errors.price_per_hour && (
                    <span className="text-[10px] text-red-500 font-bold block mt-1">{errors.price_per_hour.message}</span>
                  )}
                </div>

                {/* Capacity */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Player Capacity</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-455 dark:text-slate-500 pointer-events-none" />
                    <input
                      type="number"
                      min="1"
                      placeholder="12"
                      {...register('capacity', { 
                        required: 'Capacity is required',
                        min: { value: 1, message: 'Capacity must be at least 1 player' }
                      })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-bold text-xs uppercase tracking-wider"
                    />
                  </div>
                  {errors.capacity && (
                    <span className="text-[10px] text-red-500 font-bold block mt-1">{errors.capacity.message}</span>
                  )}
                </div>

              </div>

              {/* Checkboxes Grid: Available Slots selection */}
              <div className="space-y-4 pt-1">
                <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-450 dark:text-slate-400">
                  <Clock className="h-4 w-4 mr-2 text-slate-400 dark:text-slate-500" />
                  <span>Choose Available Slots</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {presetSlots.map((slot) => {
                    const isChecked = selectedSlots.includes(slot);
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => handleSlotToggle(slot)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all active:scale-95 duration-200 ${
                          isChecked
                            ? 'bg-blue-500/10 border-blue-400/30 text-blue-650 dark:text-sky-400 shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-550 dark:text-slate-400 uppercase tracking-widest block">Description</label>
                <div className="relative">
                  <AlignLeft className="absolute left-4 top-3.5 h-5 w-5 text-slate-455 dark:text-slate-500 pointer-events-none" />
                  <textarea
                    rows="4"
                    placeholder="Provide a detailed description about the field size, turf quality, locker rooms, floodlights availability, and parking spaces..."
                    {...register('description', { required: 'Description is required' })}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-900 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-500/40 transition-all font-semibold text-xs uppercase tracking-wider resize-none"
                  />
                </div>
                {errors.description && (
                  <span className="text-[10px] text-red-500 font-bold block mt-1">{errors.description.message}</span>
                )}
              </div>

              {/* Info panel */}
              <div className="flex items-start space-x-2.5 p-3.5 bg-blue-500/10 border border-blue-500/20 dark:bg-sky-955/20 dark:border-sky-900/40 rounded-2xl">
                <Info className="h-4.5 w-4.5 text-blue-650 dark:text-sky-400 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                  By submitting this form, you acknowledge that you are list owner of this facility. You will be able to edit schedule slots, details, and delete the facility anytime from your dashboard.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 rounded-2xl shadow-sm active:scale-95 transition-all text-xs uppercase tracking-widest flex items-center justify-center animate-none"
              >
                {submitting ? (
                  <Spinner size="small" />
                ) : (
                  <>
                    List Sports Facility
                  </>
                )}
              </button>

            </form>

          </motion.div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
