import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  borderColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, borderColor = 'border-lime-500/20' }) => {
  return (
    <div className={`bg-[#1a1a1a]/80 border ${borderColor} rounded-2xl p-6`}>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
  );
};

export default StatCard;