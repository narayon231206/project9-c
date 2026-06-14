'use client';

import React from 'react';
import Link from 'next/link';
import { Dribbble, Mail, Phone, MapPin, Facebook, Instagram, Github, Youtube, Linkedin, X } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white dark:bg-[#0d1117] border-t border-slate-200/50 dark:border-slate-800/40 transition-colors duration-200 overflow-hidden">
      {/* Background soft glow blobs (Only in dark mode for premium feel) */}
      <div className="hidden dark:block absolute bottom-0 left-0 w-96 h-96 bg-blue-500/8 blur-3xl rounded-full pointer-events-none" />
      <div className="hidden dark:block absolute bottom-12 right-0 w-96 h-96 bg-emerald-500/8 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">

          {/* Column 1 - Brand & Desc */}
          <div className="md:col-span-1 space-y-6">
            <Link href="/" className="flex items-center space-x-3 font-black text-xl group">
              <div className=" bg-gradient-to-br  to-sky-500 text-white  shadow-blue-500/20 group-hover:scale-110 group-hover:shadow-blue-500/40 transition-all duration-300">
                <img className="h-7 w-7" src="https://i.ibb.co.com/5XMPtPKC/346-removebg-preview.png" alt="MediQueue" />
              </div>
              <span className="text-slate-900 dark:text-white font-black">
                Medi<span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">Queue</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              EduConnect is the leading online tutoring marketplace. Connect with qualified educators, book personalized sessions, and achieve your academic goals with expert guidance.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3 pt-3">
              <a 
                href="https://www.facebook.com/masudranamdra1/" 
                target="_blank"
                rel="noopener noreferrer"
                className="group/icon p-3 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/40 text-slate-500 dark:text-slate-450 hover:text-blue-600 dark:hover:text-sky-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:border-blue-500/30 dark:hover:border-sky-500/30 transition-all duration-300 group-hover/icon:scale-110" 
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/masudranamdra/" 
                target="_blank"
                rel="noopener noreferrer"
                className="group/icon p-3 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/40 text-slate-500 dark:text-slate-450 hover:text-blue-600 dark:hover:text-sky-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:border-blue-500/30 dark:hover:border-sky-500/30 transition-all duration-300 group-hover/icon:scale-110" 
                aria-label="Linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com/masudranamdra" 
                target="_blank"
                rel="noopener noreferrer"
                className="group/icon p-3 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/40 text-slate-500 dark:text-slate-450 hover:text-blue-600 dark:hover:text-sky-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:border-blue-500/30 dark:hover:border-sky-500/30 transition-all duration-300 group-hover/icon:scale-110" 
                aria-label="Github"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://www.youtube.com/@Masudranamdra" 
                target="_blank"
                rel="noopener noreferrer"
                className="group/icon p-3 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/40 text-slate-500 dark:text-slate-450 hover:text-blue-600 dark:hover:text-sky-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:border-blue-500/30 dark:hover:border-sky-500/30 transition-all duration-300 group-hover/icon:scale-110" 
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-200">Quick Links</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/tutors" className="text-slate-650 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200">
                  Browse Tutors
                </Link>
              </li>
              <li>
                <Link href="/my-tutors" className="text-slate-650 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200">
                  My Tutors
                </Link>
              </li>
              <li>
                <Link href="/my-booked-sessions" className="text-slate-650 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Popular Subjects */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300">Popular Subjects</h3>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link href="/tutors?subject=mathematics" className="text-slate-650 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200">
                  Mathematics
                </Link>
              </li>
              <li>
                <Link href="/tutors?subject=physics" className="text-slate-650 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200">
                  Physics
                </Link>
              </li>
              <li>
                <Link href="/tutors?subject=chemistry" className="text-slate-650 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200">
                  Chemistry
                </Link>
              </li>
              <li>
                <Link href="/tutors?subject=english" className="text-slate-650 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200">
                  English Language
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300">Contact Us</h3>
            <ul className="space-y-3.5 text-xs text-slate-600 dark:text-slate-400 font-semibold">
              <li className="flex items-start space-x-3">
                <MapPin className="h-4.5 w-4.5 text-blue-600 dark:text-sky-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">Shodor, Dinajpur-5200, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4.5 w-4.5 text-blue-600 dark:text-sky-400 flex-shrink-0" />
                <span>+880 17879-46047</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4.5 w-4.5 text-blue-600 dark:text-sky-400 flex-shrink-0" />
                <span className="truncate">narayon231206@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-900 text-xs text-slate-500 dark:text-slate-500 font-semibold">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© {currentYear} EduConnect Learning Platform. Empowering students worldwide. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/terms" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <span className="text-slate-300 dark:text-slate-800">|</span>
              <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
