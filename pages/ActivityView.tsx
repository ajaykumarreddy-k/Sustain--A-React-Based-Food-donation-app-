
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, Calendar, ArrowRight } from 'lucide-react';

const ActivityView: React.FC = () => {
  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar px-6 pt-16 pb-40">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-extrabold tracking-tight mb-1">Your Activity</h1>
        <p className="text-ios-systemGray font-medium">Tracking your community impact</p>
      </motion.div>

      {/* Impact Dashboard */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <StatWidget label="Food Saved" value="12.4" unit="kg" icon={<TrendingUp size={18} className="text-ios-systemGreen" />} />
        <StatWidget label="Meals Shared" value="28" unit="" icon={<Heart size={18} className="text-ios-systemRed" />} />
      </div>

      {/* Impact Chart Mock */}
      <div className="glass-panel p-6 rounded-[2.5rem] mb-8 shadow-xl shadow-black/5">
        <div className="flex justify-between items-end mb-4">
          <h3 className="font-bold text-lg">Weekly Impact</h3>
          <span className="text-xs font-bold text-ios-systemGreen">+12% vs last week</span>
        </div>
        <div className="flex items-end justify-between h-32 gap-2">
          {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.1, duration: 1 }}
              className={`w-full rounded-t-lg ${i === 3 ? 'bg-ios-blue' : 'bg-ios-blue/20'}`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] font-bold text-ios-systemGray uppercase">
          <span>Mon</span>
          <span>Sun</span>
        </div>
      </div>

      {/* Recent History */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold px-1">Recent History</h3>
        <HistoryItem title="Gourmet Pastry Box" date="Yesterday" status="Collected" donor="Sugar & Spice" />
        <HistoryItem title="Fresh Bread" date="2 days ago" status="Collected" donor="Wild Flour" />
        <HistoryItem title="Sourdough Starter" date="Oct 12" status="Expired" donor="Community Hub" expired />
      </div>
    </div>
  );
};

const StatWidget: React.FC<{ label: string, value: string, unit: string, icon: React.ReactNode }> = ({ label, value, unit, icon }) => (
  <div className="glass-panel p-5 rounded-[2rem] shadow-lg shadow-black/5">
    <div className="flex items-center justify-between mb-3">
      {icon}
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-3xl font-black">{value}</span>
      <span className="text-xs font-bold text-ios-systemGray uppercase">{unit}</span>
    </div>
    <p className="text-[10px] font-black text-ios-systemGray uppercase mt-1 tracking-wider">{label}</p>
  </div>
);

const HistoryItem: React.FC<{ title: string, date: string, status: string, donor: string, expired?: boolean }> = ({ title, date, status, donor, expired }) => (
  <div className="glass-panel p-4 rounded-2xl flex items-center justify-between shadow-sm border border-black/5">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${expired ? 'bg-ios-systemRed/10 text-ios-systemRed' : 'bg-ios-systemGreen/10 text-ios-systemGreen'}`}>
        <Calendar size={18} />
      </div>
      <div>
        <h4 className="font-bold text-sm">{title}</h4>
        <p className="text-[11px] text-ios-systemGray font-medium">{donor} • {date}</p>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${expired ? 'bg-ios-systemRed/10 text-ios-systemRed' : 'bg-ios-systemGreen/10 text-ios-systemGreen'}`}>
        {status}
      </span>
      <ArrowRight size={14} className="text-ios-systemGray mt-1" />
    </div>
  </div>
);

export default ActivityView;
