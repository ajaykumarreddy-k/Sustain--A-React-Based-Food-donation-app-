
import React from 'react';
import { motion } from 'framer-motion';
import { Map, Bell, LayoutGrid, User } from 'lucide-react';
import DonateFAB from './DonateFAB';
import { ViewType } from '../types';

interface BottomNavProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  onStartDonation: (type: 'food' | 'money') => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onViewChange, onStartDonation }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-[70]">
      <div className="glass-panel rounded-[2.5rem] px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/10">
        <NavIcon 
          active={activeView === 'feed'} 
          onClick={() => onViewChange('feed')}
          icon={<LayoutGrid size={24} />} 
          label="Home"
        />
        
        <NavIcon 
          active={activeView === 'map'} 
          onClick={() => onViewChange('map')}
          icon={<Map size={24} />} 
          label="Map"
        />

        <div className="relative -top-6">
          <DonateFAB onSelectType={onStartDonation} />
        </div>

        <NavIcon 
          active={activeView === 'activity'} 
          onClick={() => onViewChange('activity')}
          icon={<Bell size={24} />} 
          label="Alerts"
        />

        <NavIcon 
          active={activeView === 'profile'} 
          onClick={() => onViewChange('profile')}
          icon={<User size={24} />} 
          label="Profile"
        />
      </div>
    </div>
  );
};

const NavIcon: React.FC<{ active: boolean; icon: React.ReactNode; label: string; onClick: () => void }> = ({ 
  active, icon, onClick 
}) => (
  <button 
    onClick={onClick}
    className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
      active ? 'text-ios-blue' : 'text-ios-systemGray'
    }`}
  >
    <motion.div
      whileTap={{ scale: 0.8 }}
      animate={active ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
    >
      {icon}
    </motion.div>
    {active && (
      <motion.div 
        layoutId="activeDot"
        className="absolute -bottom-1.5 w-1 h-1 bg-ios-blue rounded-full"
      />
    )}
  </button>
);

export default BottomNav;
