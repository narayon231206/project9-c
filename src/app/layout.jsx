import { Inter } from 'next/font/google';
import '../styles/globals.css'; // Let's make sure it loads our tailwind setup
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata = {
  title: 'MediQueue - Professional Tutor Booking Platform',
  description: 'Connect with expert tutors for personalized learning. Book online or offline tutoring sessions easily. Quality education at your fingertips.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme') || 'light';
                  if (savedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#070b19] dark:text-slate-100 transition-colors duration-300 font-sans flex flex-col antialiased">
        <ThemeProvider>
          <AuthProvider>
            <Toaster 
              position="top-center"
              toastOptions={{
                className: 'dark:bg-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl font-medium',
                duration: 4000,
              }}
            />
            <Navbar />
            <main className="flex-grow pt-16 flex flex-col">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
