'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Users, Zap } from 'lucide-react';
import { getSafeImageSrc, handleImageFallback } from '@/utils/images';

const FacilityCard = ({ facility }) => {
  const { _id, name, facility_type, image, location, price_per_hour, capacity } = facility;

  const sportColors = {
    football: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    basketball: 'bg-orange-500/10 text-orange-655 dark:text-orange-400 border-orange-500/20',
    cricket: 'bg-emerald-500/10 text-emerald-650 dark:text-emerald-450 border-emerald-500/20',
    badminton: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    tennis: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    swimming: 'bg-sky-500/10 text-sky-655 dark:text-sky-400 border-sky-500/20',
  };

  const badgeClass = sportColors[facility_type.toLowerCase()] || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 border-slate-200 dark:border-slate-700/50';

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/60 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl dark:hover:shadow-blue-500/10 hover:border-blue-500/40 dark:hover:border-blue-500/30 transition-all duration-300"
    >
      
      {/* Aspect Ratio Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-950 dark:to-slate-900">
        <img
          src={getSafeImageSrc(image)}
          alt={name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={handleImageFallback}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300" />
        
        {/* Sport Type badge */}
        <div className="absolute top-4 left-4 z-10">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-xl border ${badgeClass} backdrop-blur-md shadow-lg`}
          >
            {facility_type}
          </motion.span>
        </div>
      </div>

      {/* Card Info Section */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-300 line-clamp-2">
            {name}
          </h3>

          {/* Location Row */}
          <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
            <MapPin className="h-4 w-4 mr-2.5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        {/* Details Specs Container - Always Show */}
        <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/50 rounded-xl">
          <div className="space-y-1.5">
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider block">Capacity</span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center">
              <Users className="h-4 w-4 mr-2 text-slate-400 dark:text-slate-500" />
              {capacity}
            </span>
          </div>
          <div className="space-y-1.5">
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider block">Price/Hour</span>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center">
              <Zap className="h-4 w-4 mr-2 text-blue-500" />
              ${price_per_hour}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 dark:border-slate-800/50 my-1" />

        {/* Price & Action Row */}
        <div className="flex justify-between items-center mt-auto pt-1">
          <div>
            <span className="text-[9px] text-slate-500 dark:text-slate-500 block uppercase font-bold tracking-wider">Hourly Rate</span>
            <span className="text-lg font-extrabold text-slate-850 dark:text-slate-100 flex items-center leading-none mt-0.5">
              <span className="text-xs font-bold text-blue-600 dark:text-sky-400 mr-0.5">$</span>
              {price_per_hour}
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-500 ml-1">/hr</span>
            </span>
          </div>

          <Link
            href={`/facilities/${_id}`}
            className="bg-blue-600 hover:bg-blue-755 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-sm hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            Book Now
          </Link>
        </div>

      </div> 

    </motion.div>
  );
};

export default FacilityCard;
