import React from 'react';
import Link from 'next/link';
import { 
  Scale, 
  UserCheck, 
  Calendar, 
  HelpCircle, 
  ShieldAlert, 
  Coins, 
  FileText, 
  ChevronRight, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';

export const metadata = {
  title: 'Terms of Service - SportNest',
  description: 'Read the terms of service and rules for reserving and booking sports facilities on SportNest.',
};

export default function TermsPage() {
  const lastUpdated = 'May 20, 2026';

  const sections = [
    {
      id: 'acceptance',
      icon: Scale,
      title: '1. Acceptance of Terms',
      content: 'By accessing, registering, or using the SportNest booking platform ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all visitors, users, players, and facility providers who access or use the Service.'
    },
    {
      id: 'accounts',
      icon: UserCheck,
      title: '2. User Accounts & Security',
      content: 'To book fields or register a facility, you must create a SportNest account. You are responsible for safeguarding your password and account credentials. You agree to provide accurate, current, and complete information during registration. Any booking made under your credentials is your sole responsibility. SportNest reserves the right to suspend accounts that provide false information or violate platform integrity.'
    },
    {
      id: 'bookings',
      icon: Calendar,
      title: '3. Facility Booking & Reservations',
      content: 'SportNest acts as an intermediary facilitating the connection between sports players and arena/court hosts. When you book a time slot, you enter into a direct agreement with the facility provider. Slot bookings are subject to availability and the specific rules of each individual facility. You must respect the selected date and time slots; arriving late does not extend your reservation.'
    },
    {
      id: 'cancellations',
      icon: ShieldAlert,
      title: '4. Cancellation & Refund Policy',
      content: 'Cancellations and rescheduling depend on individual facility policies. Generally, cancellations made less than 24 hours before the booked slot are non-refundable. Refund processing takes 3-5 business days. In case a facility host cancels a slot due to bad weather or maintenance, you are entitled to a full refund or free rescheduling.'
    },
    {
      id: 'payments',
      icon: Coins,
      title: '5. Fees, Pricing & Payments',
      content: 'All prices listed on the platform are determined by the respective facility providers. SportNest does not charge hidden fees. Secure online payment processing is integrated via authorized payment gateways. You agree to pay the listed slot fees, along with any applicable taxes. We reserve the right to modify booking fee structures with prior notice.'
    },
    {
      id: 'conduct',
      icon: HelpCircle,
      title: '6. User Conduct & Ground Rules',
      content: 'Players must abide by the rules of the respective sports arenas. Damage to the property, vandalism, physical or verbal violence, or playing outside the designated hours may result in immediate expulsion from the arena, liability for repairs, and permanent suspension of your SportNest account. Play clean, respect others.'
    },
    {
      id: 'liability',
      icon: AlertCircle,
      title: '7. Limitation of Liability',
      content: 'SportNest is not responsible for injuries, health issues, lost items, or accidents occurring at any sports facility. We do not own or manage the arenas listed. Hosts are solely responsible for physical safety and equipment quality. To the maximum extent permitted by law, SportNest is not liable for direct, indirect, or consequential damages resulting from your usage of the platform.'
    },
    {
      id: 'amendments',
      icon: FileText,
      title: '8. Changes to Terms',
      content: 'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 7 days\' notice prior to any new terms taking effect. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.'
    }
  ];

  return (
    <div className="bg-slate-55 dark:bg-[#070b19] min-h-screen transition-colors duration-250">
      
      {/* 1. HERO HEADER */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-955 via-slate-900 to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/10 blur-[80px] rounded-full" />
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-sky-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            <span>Agreement</span>
            <ChevronRight className="h-3 w-3" />
            <span>Terms of Service</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-405 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-medium">
            Please read these terms carefully before booking any sports facility.
          </p>
          <div className="text-xs text-slate-550 pt-2 font-semibold">
            Last Updated: <span className="text-slate-300">{lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* 2. TERMS CONTENT */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Sticky Index */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-4 flex items-center">
                  <Scale className="h-5 w-5 mr-2 text-blue-600 dark:text-sky-400" />
                  Document Outline
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
                  <MessageSquare className="h-5 w-5" />
                  <h4 className="font-bold text-sm">Need Clarification?</h4>
                </div>
                <p className="text-xs text-slate-655 dark:text-slate-400 leading-relaxed font-medium">
                  If you have questions regarding any clauses or refund procedures, reach out to our team at any time.
                </p>
              </div>
            </aside>

            {/* Main Terms list */}
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
