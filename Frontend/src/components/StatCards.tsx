import React from 'react';
import type { IconType } from 'react-icons'; 

interface StatCardProps {
  label: string;
  value: string;
  icon: IconType; 
  iconBg: string;
  iconColor: string;
  tag: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, iconBg, iconColor, tag }) => {
  return (
    <div className="glass rounded-2xl p-6 card-hover">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center`}>
          <Icon className={`${iconColor} text-xl`} /> 
        </div>
        <span className="text-xs text-white bg-[#6B4C35] px-2 py-1 rounded-lg">{tag}</span>
      </div>
      <p className="text-[#876245] text-sm mb-1">{label}</p>
      <h3 className="text-3xl font-bold text-black">{value}</h3>
    </div>
  );
};

export default StatCard;