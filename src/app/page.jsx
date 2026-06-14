'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/utils/api';
import TutorCard from '@/components/TutorCard';
import Spinner from '@/components/Spinner';
import { motion } from 'framer-motion';
import heroData from '@/data/heroData.json';
import {
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Users,
  Award,
  Target,
  Zap,
  ArrowRight,
  ChevronRight,
  Sparkles,
  MessageCircle
} from 'lucide-react';

export default function HomePage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch tutors for featured section (6 limit via MongoDB)
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        const data = await api.get('/tutors');
        const tutorsList = Array.isArray(data) ? data : data.tutors;
        if (Array.isArray(tutorsList)) {
          setTutors(tutorsList.slice(0, 6));
        }
      } catch (error) {
        setTutors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  // Auto-advance hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroData.heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentSlideData = heroData.heroSlides[currentSlide];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  const learningBenefits = [
    {
      title: 'Verified Expert Tutors',
      description: 'Learn from carefully reviewed educators with subject expertise, clear communication, and reliable teaching records.',
      icon: Award,
      accent: 'blue'
    },
    {
      title: 'Personalized Study Plans',
      description: 'Get lesson plans shaped around your current level, target outcome, preferred pace, and learning style.',
      icon: Target,
      accent: 'emerald'
    },
    {
      title: 'Flexible Scheduling',
      description: 'Book online, offline, or hybrid sessions at convenient times without interrupting school, work, or family routines.',
      icon: Zap,
      accent: 'amber'
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor improvement through regular feedback, milestone reviews, and practical next steps after every session.',
      icon: TrendingUp,
      accent: 'indigo'
    },
    {
      title: 'Focused Learning Resources',
      description: 'Use topic-focused notes, practice tasks, and exam preparation materials aligned with each learner goal.',
      icon: BookOpen,
      accent: 'cyan'
    },
    {
      title: 'Supportive Communication',
      description: 'Keep expectations clear with responsive tutor communication, session updates, and learner-first support.',
      icon: MessageCircle,
      accent: 'slate'
    }
  ];

  const benefitAccentClasses = {
    blue: {
      card: 'hover:border-blue-500/40 dark:hover:border-blue-400/40',
      glow: 'bg-blue-500/10 group-hover:bg-blue-500/15',
      icon: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300'
    },
    emerald: {
      card: 'hover:border-emerald-500/40 dark:hover:border-emerald-400/40',
      glow: 'bg-emerald-500/10 group-hover:bg-emerald-500/15',
      icon: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
    },
    amber: {
      card: 'hover:border-amber-500/40 dark:hover:border-amber-400/40',
      glow: 'bg-amber-500/10 group-hover:bg-amber-500/15',
      icon: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300'
    },
    indigo: {
      card: 'hover:border-indigo-500/40 dark:hover:border-indigo-400/40',
      glow: 'bg-indigo-500/10 group-hover:bg-indigo-500/15',
      icon: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300'
    },
    cyan: {
      card: 'hover:border-cyan-500/40 dark:hover:border-cyan-400/40',
      glow: 'bg-cyan-500/10 group-hover:bg-cyan-500/15',
      icon: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300'
    },
    slate: {
      card: 'hover:border-slate-500/40 dark:hover:border-slate-400/40',
      glow: 'bg-slate-500/10 group-hover:bg-slate-500/15',
      icon: 'bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-200'
    }
  };

  const successMetrics = [
    {
      value: '500+',
      label: 'Verified Tutors',
      detail: 'Subject specialists available for one-to-one and group learning.',
      icon: Users,
      accent: 'bg-blue-600 text-white shadow-blue-500/25'
    },
    {
      value: '12K+',
      label: 'Sessions Completed',
      detail: 'Online, offline, and hybrid lessons booked through the platform.',
      icon: CheckCircle2,
      accent: 'bg-emerald-600 text-white shadow-emerald-500/25'
    },
    {
      value: '35+',
      label: 'Subjects Covered',
      detail: 'Academic, language, admission, and skill-based tutoring options.',
      icon: BookOpen,
      accent: 'bg-indigo-600 text-white shadow-indigo-500/25'
    },
    {
      value: '4.9/5',
      label: 'Learner Feedback',
      detail: 'Average satisfaction from students and parents after completed sessions.',
      icon: Award,
      accent: 'bg-amber-600 text-white shadow-amber-500/25'
    }
  ];

  const learningTracks = [
    'School & College',
    'Admission Prep',
    'Language Learning',
    'Skill Development'
  ];

  return (
    <div className="flex-grow bg-slate-50 -mt-16 dark:bg-[#070b19] transition-colors duration-250">

      {/* HERO BANNER SLIDER */}


      <section className="relative pt-40 pb-24 sm:pt-48 sm:pb-32 overflow-hidden bg-cover bg-center bg-[url('https://i.ibb.co.com/WbbG4w1/na.jpg')]">
        {/* Overlay for text readability */}

        {/* <div className="absolute inset-0 bg-black/40 z-0" /> */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black z-0" />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />


        {/* Background glow meshes */}
        <div className="hidden dark:block absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-2xl rounded-full pointer-events-none" />
        <div className="hidden dark:block absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/8 blur-3xl rounded-full pointer-events-none" />

        <div className="md:-mt-20 md:pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={currentSlide}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left Content */}
            <div className="space-y-8 text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2.5 bg-blue-500/15 text-blue-700 dark:text-sky-300 px-5 py-2 rounded-full border border-blue-300/40 dark:border-blue-500/30 text-xs font-bold uppercase tracking-wider shadow-inner"
              >
                <Sparkles className="h-4 w-4" />
                <span>Premium Education Platform</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-inter text-5xl sm:text-6xl lg:text-7xl font-black text-slate-100 dark:text-white tracking-tight leading-[1.05]"
              >
                {currentSlideData.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-inter text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 dark:from-sky-400 dark:to-blue-300 bg-clip-text text-transparent"
              >
                {currentSlideData.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-inter text-lg sm:text-xl text-slate-100 dark:text-slate-300 max-w-xl font-semibold leading-relaxed"
              >
                {currentSlideData.description}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="pt-6 flex flex-wrap gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/tutors"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all text-sm uppercase tracking-wider flex items-center group"
                  >
                    {currentSlideData.cta}
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/add-tutor"
                    className="border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-10 py-4 rounded-xl transition-all text-sm uppercase tracking-wider flex items-center shadow-md hover:shadow-lg"
                  >
                    Become a Tutor
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative"
            >

              <div className="relative rounded-3xl overflow-hidden h-full group shadow-2xl-black">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/26 via-transparent to-transparent" />

                <img
                  src={currentSlideData.image}
                  alt={currentSlideData.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" /> */}
              </div>

              {/* Floating stat cards */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-8 -left-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-100 dark:border-slate-800/60 p-5 rounded-2xl shadow-2xl"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-500/15 text-blue-600 dark:text-blue-400 rounded-xl">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Expert Tutors</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">500+</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute -top-8 -right-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 p-5 rounded-2xl shadow-2xl"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded-xl">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Success Rate</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">98%</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Slider Controls */}
        <div className="flex justify-center gap-3 mt-16 relative z-20">
          {heroData.heroSlides.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-10 h-3 bg-gradient-to-r from-blue-600 to-sky-500 shadow-lg shadow-blue-500/50' : 'w-3 h-3 bg-white/60 dark:bg-slate-700 hover:bg-white dark:hover:bg-slate-600'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* AVAILABLE TUTORS SECTION */}
      <section className="py-32 bg-white dark:bg-[#070b19] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-20 gap-6">
            <div className="space-y-4">
              <span className="text-blue-600 dark:text-sky-400 font-bold text-xs uppercase tracking-widest block">Expert Educators</span>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight">Featured Tutors</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-md text-sm font-semibold leading-relaxed">
                Discover our most sought-after tutors with proven track records in various subjects.
              </p>
            </div>
            <motion.div whileHover={{ x: 4 }}>
              <Link
                href="/tutors"
                className="group inline-flex items-center text-blue-600 dark:text-sky-400 hover:text-blue-700 dark:hover:text-sky-300 font-bold text-sm uppercase tracking-wider transition-colors px-6 py-3 rounded-xl hover:bg-blue-500/10 dark:hover:bg-sky-500/10"
              >
                View All Tutors {tutors.length > 0 ? `(${tutors.length})` : ''}
                <ArrowRight className="ml-2.5 h-4 w-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {loading ? (
            <div className="py-24 flex justify-center">
              <Spinner size="large" />
            </div>
          ) : tutors.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-12 bg-slate-50 dark:bg-slate-900/30 max-w-xl mx-auto">
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No tutors listed yet</h3>
              <p className="text-sm text-slate-500 mt-2 font-medium">Be the first to join as a tutor!</p>
              <Link
                href="/add-tutor"
                className="mt-6 inline-flex bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl text-sm uppercase tracking-wider shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:shadow-blue-500/30"
              >
                Add Tutor Profile
              </Link>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {tutors.map((tutor) => (
                <motion.div key={tutor._id} variants={itemVariants}>
                  <TutorCard tutor={tutor} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* WHY CHOOSE OUR TUTORS SECTION */}
      <section className="py-32 dark:from-[#0b1329] dark:to-[#070b19] border-y border-slate-200/50 dark:border-slate-800/30 relative overflow-hidden">
        <div className="absolute left-0 top-1/2 w-96 h-96 bg-blue-500/8 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-emerald-500/8 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-4 mb-24">
            <span className="text-blue-600 dark:text-sky-400 font-bold text-xs uppercase tracking-widest block">Why Choose Us</span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight">Premium Learning Experience</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
              We connect passionate learners with expert educators for transformative learning experiences.
            </p>
          </div>

          {/* Benefits Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {learningBenefits.map((benefit) => {
              const Icon = benefit.icon;
              const accent = benefitAccentClasses[benefit.accent];

              return (
                <motion.div
                  key={benefit.title}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className={`p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60 ${accent.card} shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden relative`}
                >
                  <div className={`absolute top-0 right-0 w-40 h-40 ${accent.glow} blur-3xl rounded-full pointer-events-none transition-colors`} />
                  <div className="space-y-5 relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: 4 }}
                      className={`p-4 ${accent.icon} rounded-xl w-fit shadow-sm`}
                    >
                      <Icon className="h-7 w-7" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{benefit.title}</h3>
                    <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* LEARNING SUCCESS STATISTICS SECTION */}
      <section className="py-32 bg-slate-50 dark:bg-[#070b19] relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-800 to-transparent" />
        <div className="absolute left-0 top-1/3 w-96 h-96 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr] gap-12 lg:gap-16 items-start">
            <div className="space-y-6">
              <span className="text-blue-600 dark:text-sky-400 font-bold text-xs uppercase tracking-widest block">Impact & Results</span>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight">Learning Success Stories</h2>
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-medium leading-relaxed">
                Real platform activity from learners, parents, and tutors working together through guided lessons, flexible bookings, and consistent feedback.
              </p>

              <div className="space-y-3 pt-3">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Popular learning tracks</p>
                <div className="flex flex-wrap gap-3">
                  {learningTracks.map((track) => (
                    <span
                      key={track}
                      className="inline-flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-300 shadow-sm"
                    >
                      {track}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {successMetrics.map((metric) => {
                const Icon = metric.icon;

                return (
                  <motion.div
                    key={metric.label}
                    variants={itemVariants}
                    whileHover={{ y: -6 }}
                    className="p-7 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/70 shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <p className="text-4xl sm:text-5xl font-extrabold text-sky-600 dark:text-white leading-none">{metric.value}</p>
                        <h3 className="mt-4 text-lg font-extrabold text-slate-900 dark:text-white">{metric.label}</h3>
                      </div>
                      <div className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl shadow-lg ${metric.accent}`}>
                        <Icon className="h-7 w-7" />
                      </div>
                    </div>
                    <p className="mt-5 text-sm font-semibold leading-relaxed text-slate-600 dark:text-slate-400">
                      {metric.detail}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      {/* bg-white dark:bg-[#0b1329] dark:border-slate-850/60 */}
      <section className="py-24  relative pt-40 pb-24 sm:pt-48 sm:pb-32 overflow-hidden bg-cover bg-center bg-[url('https://i.ibb.co.com/Q7ktPkNz/Gemini-Generated-Image-6sgem36sgem36sge.png')]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="text-blue-600 dark:text-sky-400 font-extrabold text-xs uppercase tracking-widest block">Ready to Start?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-200 dark:text-white">Begin Your Learning Journey</h2>
            <p className="text-slate-400 dark:text-slate-300 text-base font-semibold max-w-2xl mx-auto">
              Whether you're looking to improve your skills or share your expertise, MediQueue is your perfect platform for quality education.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Link
              href="/tutors"
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-4 rounded-2xl shadow-md hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-widest flex items-center justify-center"
            >
              Find Your Tutor
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/add-tutor"
              className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 font-extrabold px-8 py-4 rounded-2xl transition-all text-xs uppercase tracking-widest flex items-center justify-center active:scale-95 shadow-sm"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
