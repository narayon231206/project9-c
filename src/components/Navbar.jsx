'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  User as UserIcon, 
  LogOut, 
  PlusCircle, 
  Calendar, 
  Sliders, 
  Activity,
  ChevronDown
} from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Monitor scroll for premium visual states
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    setMounted(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res.success) {
      setDropdownOpen(false);
      setMobileMenuOpen(false);
      router.push('/');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tutors', path: '/tutors' },
  ];

  const privateLinks = [
    { name: 'My Booked Sessions', path: '/my-booked-sessions', icon: Calendar },
    { name: 'Add Tutor', path: '/add-tutor', icon: PlusCircle },
    { name: 'My Tutors', path: '/my-tutors', icon: Sliders },
  ];

  const isActive = (path) => pathname === path;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-2.5 backdrop-blur-xl border-b border-slate-200/0 dark:border-slate-700/40 shadow-xl dark:shadow-2xl dark:shadow-black/80' 
          : 'py-3 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex justify-center items-center space-x-3 group">
              <div className="relative flex items-center justify-center h-11 w-11  via-blue-100 to-sky-500 text-white  transition-all duration-300">
                <img src="https://i.ibb.co.com/5XMPtPKC/346-removebg-preview.png" alt="MediQueue" />
              </div>
              <span className="text-slate-900 dark:text-white font-black tracking-tight text-xl hidden sm:inline">
                Medi<span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">Queue</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex space-x-1 items-center bg-white/40 dark:bg-slate-800/20 border border-slate-200/40 dark:border-slate-700/30 px-3 py-2 rounded-full backdrop-blur-xl hover:bg-white/50 dark:hover:bg-slate-800/30 transition-colors">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-blue-600 dark:text-sky-300'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-white dark:bg-slate-700/50 border border-slate-300/50 dark:border-slate-600/50 rounded-full shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            
            {/* Private Navigation Links (Inline Desktop) */}
            {isAuthenticated && privateLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-blue-600 dark:text-sky-300'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-white dark:bg-slate-700/50 border border-slate-300/50 dark:border-slate-600/50 rounded-full shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Theme, Auth Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggler */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-slate-200/50 dark:border-slate-800/40 bg-slate-100/50 dark:bg-slate-900/30 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {mounted ? (
                theme === 'dark' ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5 text-blue-650" />
              ) : (
                <div className="h-4.5 w-4.5" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                {/* Logged in Avatar trigger */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none p-1.5 pr-4 pl-2 rounded-full border border-slate-200/50 dark:border-slate-800/50 hover:border-blue-500/40 dark:hover:border-sky-500/40 bg-slate-100/50 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all"
                >
                  <img
                    src={user?.photoURL}
                    alt={user?.name}
                    className="h-8 w-8 rounded-full object-cover shadow-sm bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700/55"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200';
                    }}
                  />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 max-w-[80px] truncate">{user?.name}</span>
                  <ChevronDown className="h-3 w-3 text-slate-500 dark:text-slate-400 transition-transform duration-300" />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setDropdownOpen(false)}
                      />
                      <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-2xl dark:shadow-2xl dark:shadow-black/50 py-2 z-20 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                          <p className="text-sm font-semibold truncate text-slate-800 dark:text-slate-200">{user?.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                        </div>
                        
                        <div className="py-1">
                          {privateLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                              <Link
                                key={link.path}
                                href={link.path}
                                onClick={() => setDropdownOpen(false)}
                                className={`flex items-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                                  isActive(link.path)
                                    ? 'bg-slate-50 dark:bg-slate-800/40 text-blue-600 dark:text-sky-400'
                                    : 'text-slate-650 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-slate-200'
                                }`}
                              >
                                <Icon className="h-4 w-4 mr-3 text-slate-400 dark:text-slate-400" />
                                {link.name}
                              </Link>
                            );
                          })}
                        </div>

                        <div className="border-t border-slate-100 dark:border-slate-800/60 pt-1">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
                          >
                            <LogOut className="h-4 w-4 mr-3" />
                            Log out
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 active:scale-95"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800/40 bg-slate-100/60 dark:bg-slate-900/20 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-all"
              aria-label="Toggle Theme"
            >
              {mounted ? (
                theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-blue-650" />
              ) : (
                <div className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800/40 bg-slate-100/60 dark:bg-slate-900/20 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-all focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="md:hidden border-t border-slate-100 dark:border-slate-900 bg-white/95 dark:bg-[#070b19]/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <div className="px-3 pt-3 pb-6 space-y-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all ${
                    isActive(link.path)
                      ? 'bg-slate-50 dark:bg-slate-900 text-blue-650 dark:text-sky-400 border border-slate-200/55 dark:border-slate-800/40'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  <div className="border-t border-slate-100 dark:border-slate-900 my-3 pt-3" />
                  <div className="px-4 py-2.5 mb-2.5 flex items-center space-x-3.5 bg-slate-50 dark:bg-slate-900/35 border border-slate-100 dark:border-slate-900 rounded-2xl">
                    <img
                      src={user?.photoURL}
                      alt={user?.name}
                      className="h-10 w-10 rounded-full object-cover bg-slate-200 dark:bg-slate-850 border border-slate-300 dark:border-slate-750"
                    />
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{user?.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                    </div>
                  </div>
                  
                  {privateLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.path}
                        href={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all ${
                          isActive(link.path)
                            ? 'bg-slate-55 dark:bg-slate-900 text-blue-600 dark:text-sky-400 border border-slate-200/55 dark:border-slate-800/40'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                      >
                        <Icon className="h-4.5 w-4.5 mr-3 text-slate-400 dark:text-slate-400" />
                        {link.name}
                      </Link>
                    );
                  })}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
                  >
                    <LogOut className="h-4.5 w-4.5 mr-3 text-red-500/80" />
                    Log out
                  </button>
                </>
              ) : (
                <div className="pt-4 px-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full bg-gradient-to-r from-blue-600 to-green-500 text-white text-center py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg shadow-blue-500/10 hover:scale-[1.01] active:scale-95 transition-all"
                  >
                    Login / Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
