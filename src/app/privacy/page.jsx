import React from 'react';
import Link from 'next/link';
import {
  Lock,
  Eye,
  Share2,
  Database,
  Cookie,
  UserCheck,
  ShieldCheck,
  Mail,
  ChevronRight
} from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy - SportNest',
  description: 'Read the privacy policy for user accounts, booking information, and data storage on SportNest.',
};

export default function PrivacyPage() {
  const lastUpdated = 'May 20, 2026';

  const sections = [
    {
      id: 'collection',
      icon: Eye,
      title: '1. Information We Collect',
      content: 'We collect information you provide directly to us when creating a SportNest account, booking a sports slot, or listing a facility. This includes your name, email address, phone number, payment details, and photos of facilities. We also log analytical data such as IP address, browser type, and device details to optimize page performance.'
    },
    {
      id: 'usage',
      icon: Database,
      title: '2. How We Use Your Information',
      content: 'Your data is utilized to: (1) facilitate bookings and schedule reservations, (2) verify account authenticity, (3) securely process payments, (4) send real-time notification alerts (SMS or email) about your bookings, and (5) analyze usage patterns to improve platform speed and safety protocols.'
    },
    {
      id: 'sharing',
      icon: Share2,
      title: '3. Data Sharing & Disclosures',
      content: 'We do not sell your personal data. We share relevant contact information (name, phone number) with the sports facility owners/hosts where you book a slot to ensure entry and security verification. We also share details with secure payment processors. If legally required by law enforcement or government authorities, we may disclose details to comply with regulations.'
    },
    {
      id: 'security',
      icon: ShieldCheck,
      title: '4. Security of Data',
      content: 'We prioritize your security by implementing SSL/TLS encryption for all transaction protocols. Database operations are stored behind firewalls, and we restrict admin access to sensitive details. However, please remember that no method of transmission over the internet is 100% secure. We encourage strong personal password habits.'
    },
    {
      id: 'cookies',
      icon: Cookie,
      title: '5. Cookies & Local Storage',
      content: 'SportNest uses cookies and local storage tokens to persist your session login status and store theme preferences (such as dark mode state). You can choose to disable cookies in your browser settings, but please note that some interactive functionalities of the slot booking system might fail to function as a result.'
    },
    {
      id: 'rights',
      icon: UserCheck,
      title: '6. Your Rights & Control',
      content: 'You have the right to access, edit, or delete your account information at any time. Simply head to your user profile settings to update credentials. If you wish to delete your entire account record, contact us. Once deleted, all historical data (except transaction logs required for audit purposes) will be permanently purged.'
    },
    {
      id: 'retention',
      icon: Lock,
      title: '7. Data Retention',
      content: 'We store your personal information only as long as your account remains active or as needed to provide booking services. Analytical logs and inactive sessions are cleaned up automatically. In addition, financial transaction history is archived in compliance with local business taxation laws.'
    },
    {
      id: 'contact',
      icon: Mail,
      title: '8. Contacting the Privacy Team',
      content: 'If you have any questions or security concerns regarding this Privacy Policy, feel free to contact us via email at masud.dev01@gmail.com, or mail us at: Chirirbandar, Dinajpur-5200, Bangladesh.'
    }
  ];

  return (
    <div className="bg-slate-55 dark:bg-[#070b19] min-h-screen transition-colors duration-250">

      {/* 1. HERO HEADER */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-slate-900 to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/10 blur-[80px] rounded-full" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-sky-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            <span>Security</span>
            <ChevronRight className="h-3 w-3" />
            <span>Privacy Policy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-405 bg-clip-text text-transparent">
            Privacy & Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-medium">
            Your trust is vital to us. Read how we protect and handle your information.
          </p>
          <div className="text-xs text-slate-550 pt-2 font-semibold">
            Last Updated: <span className="text-slate-300">{lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* 2. PRIVACY CONTENT */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Sidebar Sticky Index */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-4 flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-blue-600 dark:text-sky-400" />
                  Policy Chapters
                </h3>
                <nav className="space-y-1">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="group flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-655 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:text-blue-600 dark:hover:text-sky-400 transition-all"
                    >
                      <span className="truncate">{sec.title.substring(3)}</span>
                      <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-blue-600 dark:text-sky-400" />
                    </a>
                  ))}
                </nav>
              </div>

              {/* Callout Box */}
              <div className="bg-emerald-50/60 dark:bg-emerald-950/10 border border-emerald-500/20 rounded-3xl p-6 space-y-3">
                <div className="flex items-center space-x-2 text-emerald-650 dark:text-emerald-400">
                  <ShieldCheck className="h-5 w-5" />
                  <h4 className="font-bold text-sm">Data Safety First</h4>
                </div>
                <p className="text-xs text-slate-655 dark:text-slate-400 leading-relaxed font-medium">
                  We use state-of-the-art encryption standards to keep your details safe. We never sell your personal data.
                </p>
              </div>
            </aside>

            {/* Main Content list */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="space-y-10">
                  {sections.map((sec) => {
                    const IconComponent = sec.icon;
                    return (
                      <div
                        key={sec.id}
                        id={sec.id}
                        className="scroll-mt-24 space-y-4 group border-b border-slate-100 dark:border-slate-800/60 pb-8 last:border-b-0 last:pb-0"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-500/10 text-blue-600 dark:text-sky-400 rounded-xl transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white">
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                            {sec.title}
                          </h2>
                        </div>
                        <p className="text-sm sm:text-base text-slate-655 dark:text-slate-400 leading-relaxed font-medium">
                          {sec.content}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
