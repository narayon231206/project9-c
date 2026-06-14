'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Award, BookOpen, CalendarDays, Clock, GraduationCap, MapPin, Users } from 'lucide-react';
import { getSafeImageSrc, handleImageFallback } from '@/utils/images';

const TutorCard = ({ tutor }) => {
  const { _id, tutorName, subject, tutorPhoto, location, hourlyFee, totalSlot, availableDays, availableTimeSlots, experience, institution } = tutor;

  const subjectColors = {
    mathematics: 'bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-200',
    physics: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200',
    chemistry: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200',
    english: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-200',
    biology: 'bg-teal-50 text-teal-700 dark:bg-teal-500/15 dark:text-teal-200',
    history: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200',
  };

  const badgeClass = subjectColors[subject?.toLowerCase()] || 'bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300';
  const primaryTimeSlot = Array.isArray(availableTimeSlots) ? availableTimeSlots[0] : availableTimeSlots;
  const displayDays = Array.isArray(availableDays) ? availableDays.join(', ') : availableDays;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-slate-300 hover:shadow-md dark:border-slate-700/50 dark:bg-slate-900/40 dark:hover:border-slate-600/50"
      style={{
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* Image Section - Clean and Minimal */}
      <div className="relative w-full overflow-hidden bg-slate-100 dark:bg-slate-950" style={{ paddingBottom: '62.5%' }}>
        <img
          src={getSafeImageSrc(tutorPhoto)}
          alt={tutorName}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={handleImageFallback}
        />

        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />

        {/* Stats Grid - Minimal and Clean */}
        <div className="grid grid-cols-1 absolute bottom-1 left-48 right-0 z-10 pl-4 py-4">
          <div className="grid gap-2">
            <div>
              <div className="flex justify-center gap-1.5 text-xs text-yellow-600">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Available : <span className="font-bold text-white">0{totalSlot || 0}</span> </span>
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center gap-1.5 text-xs text-yellow-400 ">
                <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Time: <span className="font-bold text-white"> {primaryTimeSlot || 'Flexible'}</span> </span>
              </div>
            </div>
          </div>
        </div>




        {/* Subject Badge - Top Left, Clean */}
        <div className="absolute left-3 top-3 z-10">
          <span className={`inline-flex rounded-md px-2.5 py-1.5 text-xs font-medium ${badgeClass}`}>
            {subject}
          </span>
        </div>

        {/* Tutor Name and Price - Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 z-10 space-y-2 bg-gradient-to-t from-black/60 via-black/20 to-transparent px-4 py-4">
          <h3 className="text-lg font-semibold text-white line-clamp-1">
            {tutorName}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">${hourlyFee}</span>
            <span className="text-xs text-slate-200">per hour</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-grow flex-col p-4 space-y-3">

        {/* Experience Badge */}
        {experience && (
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="font-medium">{experience}</span>
          </div>
        )}



        {/* Available Days */}
        {displayDays && (
          <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
            <CalendarDays className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
            <span className="line-clamp-2">{displayDays}</span>
          </div>
        )}



        <div className="flex gap-2 justify-between">
          {/* Location */}
          {location && (
            <div className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
              <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
              <span className="line-clamp-1 font-medium">{location}</span>
            </div>
          )}


          {/* Institution */}
          {institution && (
            <div className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
              <Award className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
              <span className="line-clamp-1 font-medium">{institution}</span>
            </div>
          )}
        </div>


        {/* Stats Grid - Minimal and Clean */}



        {/* Action Button */}
        <Link
          href={`/tutors/${_id}`}
          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 active:scale-95 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          <BookOpen className="h-4 w-4" />
          View Profile
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
};

export default TutorCard;
