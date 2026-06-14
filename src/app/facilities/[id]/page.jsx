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
  DollarSign, 
  Users, 
  Clock, 
  BookOpen, 
  Calendar, 
  AlertCircle, 
  ArrowLeft,
  CalendarCheck,
  Zap,
  Info
} from 'lucide-react';

export default function FacilityDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();

  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [hours, setHours] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Get today's date formatted as YYYY-MM-DD to lock calendar inputs
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await api.get(`/facilities/${id}`);
        if (data.success && data.facility) {
          setFacility(data.facility);
          // Set initial default slot if available
          if (data.facility.available_slots?.length > 0) {
            setSelectedSlot(data.facility.available_slots[0]);
          }
        }
      } catch (error) {
        toast.error('Failed to load facility details');
        router.push('/facilities');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, router]);

  // Live Auto-calculated total price
  const totalPrice = facility ? hours * facility.price_per_hour : 0;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // 1. Auth check: Redirect to login if not authenticated
    if (!isAuthenticated) {
      toast.error('Please login to book a sports facility slot.');
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    // 2. Validate inputs
    if (!bookingDate) {
      toast.error('Please select a booking date.');
      return;
    }
    if (!selectedSlot) {
      toast.error('Please choose a time slot.');
      return;
    }
    if (hours < 1) {
      toast.error('Booking must be at least 1 hour.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post('/bookings', {
        facility_id: id,
        booking_date: bookingDate,
        time_slot: selectedSlot,
        hours: Number(hours),
        total_price: totalPrice,
      });

      if (res.success) {
        toast.success(res.message || 'Slot reserved successfully!');
        router.push('/bookings');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to book slot');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-grow flex justify-center items-center py-28 bg-slate-950">
        <Spinner size="large" />
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="flex-grow flex flex-col justify-center items-center py-20 bg-slate-950 text-slate-300">
        <p className="text-lg font-bold text-slate-350">Facility not found</p>
        <button onClick={() => router.push('/facilities')} className="mt-4 bg-cyan-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider">
          Back to Facilities
        </button>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-slate-955 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200 relative min-h-screen">
      
      {/* Background glow meshes */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Back Link */}
        <button
          onClick={() => router.push('/facilities')}
          className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
        >
          <ArrowLeft className="h-4.5 w-4.5 mr-2" />
          Back to facilities
        </button>

        {/* Master Details layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 2 COLUMNS - Facility details, description */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Facility Image Showcase */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-900"
            >
              <img
                src={getSafeImageSrc(facility.image)}
                alt={facility.name}
                className="h-full w-full object-cover"
                onError={handleImageFallback}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-65" />
              <div className="absolute top-6 left-6 z-10">
                <span className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-widest rounded-xl shadow-md">
                  {facility.facility_type}
                </span>
              </div>
            </motion.div>

            {/* Core Info Details Card */}
            <div className="bg-white dark:bg-slate-900/60 p-8 rounded-3xl border border-slate-200 dark:border-slate-850/60 shadow-sm dark:shadow-xl space-y-6 backdrop-blur-md">
              
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {facility.name}
                </h1>
                
                {/* Location row */}
                <div className="flex items-center text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-semibold">
                  <MapPin className="h-4.5 w-4.5 mr-2 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                  <span>{facility.location}</span>
                </div>
              </div>

              {/* Specs Icons Row */}
              <div className="grid grid-cols-2 bg-white dark:bg-slate-900/40 sm:grid-cols-3 gap-4 p-4 bg-slate-950/40 rounded-2xl border border-slate-550">
                <div className="space-y-1">
                  <span className="text-[9px] text-slate-550 dark:text-slate-400 uppercase font-bold tracking-wider block">Price rate</span>
                  <span className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center">
                    <span className="text-xs font-bold text-cyan-400 mr-0.5">$</span>
                    {facility.price_per_hour}
                    <span className="text-[10px] font-semibold text-slate-500 ml-1">/hr</span>
                  </span>
                </div>
                
                <div className="space-y-1">
                  <span className="text-[9px] text-slate-550 dark:text-slate-400 uppercase font-bold tracking-wider block">Capacity</span>
                  <span className="text-base font-bold text-slate-250 dark:text-slate-250 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                    {facility.capacity} Players
                  </span>
                </div>

                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[9px] text-slate-550 dark:text-slate-400 uppercase font-bold tracking-wider block">Total Bookings</span>
                  <span className="text-base font-bold text-slate-250 flex items-center">
                    <CalendarCheck className="h-4 w-4 mr-2 text-slate-500 flex-shrink-0" />
                    {facility.booking_count || 0} times
                  </span>
                </div>
              </div>

              {/* Description section */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-slate-500" />
                  Facility Description
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-semibold">
                  {facility.description}
                </p>
              </div>

              {/* Available Slots Badges list */}
              <div className="space-y-4 pt-2">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Standard Schedule slots
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {facility.available_slots?.map((slot) => (
                    <span 
                      key={slot} 
                      className="px-3.5 py-2  rounded-xl text-xs font-bold bg-slate-50 text-slate-900 border border-slate-500 text-slate-350"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN - Secure Booking Form Card */}
          <div className="lg:col-span-4">
            <div className="dark:bg-slate-900/60 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 sticky top-24 backdrop-blur-md">
              
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-lg  font-bold text-slate-900 dark:text-white tracking-wide">Secure Match Slot</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Book turf and checkout in seconds.</p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-5">
                
                {/* Read-only Facility Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Facility Name</label>
                  <input
                    type="text"
                    value={facility.name}
                    readOnly
                    className="w-full px-4 py-3 rounded-2xl dark:bg-slate-950 text-slate-400 border border-slate-300 focus:outline-none font-bold text-xs uppercase tracking-wider select-none"
                  />
                </div>

                {/* Booking Date field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Booking Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <input
                      type="date"
                      min={todayStr}
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl dark:bg-slate-950 text-slate-500 border border-slate-300 focus:outline-none focus:border-cyan-500/40 transition-all font-semibold text-xs uppercase tracking-wider"
                    />
                  </div>
                </div>

                {/* Slots Dropdown selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Time Slot</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" />
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl dark:bg-slate-950 text-slate-500 border border-slate-300 focus:outline-none focus:border-cyan-500/40 transition-all font-semibold text-xs uppercase tracking-wider appearance-none cursor-pointer"
                    >
                      {facility.available_slots?.map((slot) => (
                        <option key={slot} value={slot} className="dark:bg-slate-950 rounded-2xl text-slate-500">
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Hours field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Duration (Hours)</label>
                  <input
                    type="number"
                    min="1"
                    value={hours}
                    onChange={(e) => setHours(Math.max(1, parseInt(e.target.value) || 1))}
                    required
                    className="w-full px-4 py-3.5 rounded-2xl dark:bg-slate-950 text-slate-500 border border-slate-300 focus:outline-none focus:border-cyan-500/40 transition-all font-bold text-xs uppercase tracking-wider"
                  />
                </div>

                {/* Live Cost calculation row */}
                
                <div className="flex items-center justify-between px-4 py-3 bg-slate-950/10 rounded-xl border border-slate-550">
                  <div className="flex items-center text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                    <Zap className="h-4 w-4 mr-2" />
                    Total Price /hr
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-200 flex items-center">
                    <span className="text-xs font-bold text-cyan-400 mr-0.5">$</span>
                    {totalPrice}
                    <span className="text-[10px] font-semibold text-slate-500 ml-1"></span>
                  </div>
                </div>
                
              
                {/* Submit trigger button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 disabled:opacity-50 text-slate-950 font-extrabold py-4 rounded-2xl shadow-lg shadow-cyan-500/10 active:scale-95 transition-all text-xs uppercase tracking-widest flex items-center justify-center"
                >
                  {submitting ? (
                    <Spinner size="small" />
                  ) : (
                    <>
                      Confirm Booking
                    </>
                  )}
                </button>
              </form>

              {/* Safety notice banner */}
              <div className="flex items-start space-x-2.5 p-3.5 border border-yellow-400/40 rounded-2xl">
                <Info className="h-4.5 w-4.5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
                  Free cancellation from your bookings list before the slot starts. Refund transfers are processed dynamically.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
