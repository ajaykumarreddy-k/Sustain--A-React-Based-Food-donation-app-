
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ViewType } from './types';
import HomeFeed from './pages/HomeFeed';
import MapView from './pages/MapView';
import ActivityView from './pages/ActivityView';
import ProfileView from './pages/ProfileView';
import BottomNav from './components/BottomNav';
import DonationOverlay from './components/DonationOverlay';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>('feed');
  const [activeDonationFlow, setActiveDonationFlow] = useState<'food' | 'money' | null>(null);

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setDarkMode(storedTheme === 'dark');
    } else {
      setDarkMode(isDark);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="relative h-screen w-full max-w-md mx-auto overflow-hidden bg-ios-lightBg dark:bg-ios-darkBg text-black dark:text-white flex flex-col selection:bg-ios-blue/30">
      
      {/* Dynamic Background - Simplified for Performance */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[100%] h-[60%] bg-ios-blue/10 dark:bg-ios-blue/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[5%] -right-[15%] w-[90%] h-[70%] bg-ios-systemGreen/10 dark:bg-ios-systemGreen/5 blur-[100px] rounded-full" />
      </div>

      {/* Main View Container */}
      <main className="flex-1 relative z-10 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeView}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 35, mass: 0.8 }}
            className="absolute inset-0"
          >
            {activeView === 'feed' && <HomeFeed />}
            {activeView === 'map' && <MapView />}
            {activeView === 'activity' && <ActivityView />}
            {activeView === 'profile' && (
              <ProfileView darkMode={darkMode} onToggleTheme={() => setDarkMode(!darkMode)} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Premium Navigation */}
      <BottomNav 
        activeView={activeView} 
        onViewChange={(view) => setActiveView(view)} 
        onStartDonation={(type) => setActiveDonationFlow(type)}
      />

      {/* Full Screen Donation Overlays */}
      <AnimatePresence>
        {activeDonationFlow && (
          <DonationOverlay 
            type={activeDonationFlow} 
            onClose={() => setActiveDonationFlow(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
