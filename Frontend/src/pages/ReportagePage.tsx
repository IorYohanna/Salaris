import React, { useEffect, useRef, useMemo } from 'react';
import { Chart, registerables } from 'chart.js';
import type { Teacher } from '../utils/types';
import StatCard from '../components/StatCards';
import { FaArrowDown, FaArrowUp, FaCalculator } from 'react-icons/fa';

Chart.register(...registerables);

interface ReportPageProps {
  teachers: Teacher[];
  formatCurrency: (num: number) => string;
}

const ReportPage: React.FC<ReportPageProps> = ({ teachers, formatCurrency }) => {
  const barChartRef = useRef<HTMLCanvasElement>(null);
  const pieChartRef = useRef<HTMLCanvasElement>(null);
  const barChartInstance = useRef<Chart | null>(null);
  const pieChartInstance = useRef<Chart | null>(null);

  const getPrestation = (t: Teacher) => t.prestation ?? (t.tauxHoraire * t.nbreHeures);
  
  const prestations = useMemo(() => teachers.map(getPrestation), [teachers]);
  
  const stats = useMemo(() => ({
    total: prestations.reduce((acc, v) => acc + v, 0),
    min: prestations.length ? Math.min(...prestations) : 0,
    max: prestations.length ? Math.max(...prestations) : 0,
  }), [prestations]);

  const top5 = useMemo(() => [...teachers]
    .sort((a, b) => getPrestation(b) - getPrestation(a))
    .slice(0, 5), [teachers]);

  useEffect(() => {
    if (!barChartRef.current || !pieChartRef.current || teachers.length === 0) return;

    if (barChartInstance.current) barChartInstance.current.destroy();
    if (pieChartInstance.current) pieChartInstance.current.destroy();

    barChartInstance.current = new Chart(barChartRef.current, {
      type: 'bar',
      data: {
        labels: top5.map(t => t.nom.split(' ')[0]),
        datasets: [{
          label: 'Prestation (Ar)',
          data: top5.map(getPrestation),
          backgroundColor: '#D4A574',
          borderRadius: 12,
          hoverBackgroundColor: '#A67C52',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { 
            grid: { color: '#f3f4f6' },
            ticks: { color: '#6b7280' }  
          },
          x: { 
            grid: { display: false }, 
            ticks: { color: '#6b7280' } 
          }
        },
      },
    });

    const ranges = {
      'Faible (<1000Ar)': teachers.filter(t => getPrestation(t) < 1000).length,
      'Moyenne (1000-2000Ar)': teachers.filter(t => { const p = getPrestation(t); return p >= 1000 && p <= 2000; }).length,
      'Élevée (>2000Ar)': teachers.filter(t => getPrestation(t) > 2000).length,
    };

    pieChartInstance.current = new Chart(pieChartRef.current, {
      type: 'doughnut',
      data: {
        labels: Object.keys(ranges),
        datasets: [{
          data: Object.values(ranges),
          backgroundColor: ['#60a5fa', '#D4A574', '#c084fc'],
          borderWidth: 4,
          borderColor: '#ffffff',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: { 
            position: 'bottom', 
            labels: { 
              color: '#4b5563', 
              padding: 20,
              font: { weight: 'bold' }
            } 
          }
        },
      },
    });

    return () => {
      barChartInstance.current?.destroy();
      pieChartInstance.current?.destroy();
    };
  }, [teachers, top5]);

  return (
    <div className="animate-fadeIn p-4 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Prestation Totale" 
          value={formatCurrency(stats.total)} 
          icon={FaCalculator} 
          iconBg="bg-[#876245]/10" 
          iconColor="text-[#876245]"
          tag="Total"
        />
        <StatCard 
          label="Prestation Minimale" 
          value={formatCurrency(stats.min)} 
          icon={FaArrowDown} 
          iconBg="bg-blue-100" 
          iconColor="text-blue-700"
          tag="Minimum"
        />
        <StatCard 
          label="Prestation Maximale" 
          value={formatCurrency(stats.max)} 
          icon={FaArrowUp} 
          iconBg="bg-purple-100" 
          iconColor="text-purple-700"
          tag="Maximum"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#D4A574] rounded-full"></span>
            Top 5 des prestations
          </h3>
          <div className="h-80">
            <canvas ref={barChartRef}></canvas>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-400 rounded-full"></span>
            Répartition par tranche
          </h3>
          <div className="h-80">
            <canvas ref={pieChartRef}></canvas>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Classement détaillé</h3>
          <span className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-500 rounded-full">TEMPS RÉEL</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Rang</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Enseignant</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Matricule</th>
                <th className="py-4 px-6 text-right text-xs font-bold text-[#876245] uppercase tracking-wider">Prestation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {top5.map((t, i) => (
                <tr key={t.matricule} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <span className={`w-8 h-8 rounded-xl ${i === 0 ? 'bg-[#6B4C35] text-white shadow-lg shadow-[#876245]/20' : 'bg-gray-100 text-gray-500'} flex items-center justify-center text-sm font-black`}>
                      {i + 1}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-gray-800 group-hover:text-[#876245] transition-colors">{t.nom}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded-md font-mono text-xs border border-gray-200">
                        {t.matricule}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="text-gray-900 font-black">{formatCurrency(getPrestation(t))}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;