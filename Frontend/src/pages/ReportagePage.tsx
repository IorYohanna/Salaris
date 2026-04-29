import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import type { Teacher } from '../utils/types';
import StatCard from '../components/StatCards';

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

    useEffect(() => {
        if (!barChartRef.current || !pieChartRef.current || teachers.length === 0) return;

        if (barChartInstance.current) barChartInstance.current.destroy();
        if (pieChartInstance.current) pieChartInstance.current.destroy();

        const top10 = [...teachers]
            .sort((a, b) =>
                (b.prestation ?? b.tauxHoraire * b.nbreHeures) -
                (a.prestation ?? a.tauxHoraire * a.nbreHeures)
            )
            .slice(0, 10);

        barChartInstance.current = new Chart(barChartRef.current, {
            type: 'bar',
            data: {
                labels: top10.map(t => t.nom.split(' ')[0]),
                datasets: [{
                    label: 'Prestation (€)',
                    data: top10.map(t => t.prestation ?? t.tauxHoraire * t.nbreHeures),
                    backgroundColor: '#a3e635',
                    borderRadius: 8,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
            },
        });

        const ranges = {
            'Faible (<1000€)': teachers.filter(t => (t.prestation ?? t.tauxHoraire * t.nbreHeures) < 1000).length,
            'Moyenne (1000-2000€)': teachers.filter(t => { const p = t.prestation ?? t.tauxHoraire * t.nbreHeures; return p >= 1000 && p <= 2000; }).length,
            'Élevée (>2000€)': teachers.filter(t => (t.prestation ?? t.tauxHoraire * t.nbreHeures) > 2000).length,
        };

        pieChartInstance.current = new Chart(pieChartRef.current, {
            type: 'doughnut',
            data: {
                labels: Object.keys(ranges),
                datasets: [{
                    data: Object.values(ranges),
                    backgroundColor: ['#3b82f6', '#a3e635', '#a855f7'],
                    borderWidth: 0,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
            },
        });

        return () => {
            barChartInstance.current?.destroy();
            pieChartInstance.current?.destroy();
        };
    }, [teachers]);

    const prestations = teachers.map(t => t.prestation ?? t.tauxHoraire * t.nbreHeures);
    const stats = {
        total: prestations.reduce((acc, v) => acc + v, 0),
        min: prestations.length ? Math.min(...prestations) : 0,
        max: prestations.length ? Math.max(...prestations) : 0,
    };

    return (
        <div className="animate-fadeIn">
            <div className="grid grid-cols-3 gap-6 mb-8">
                <StatCard label="Prestation Totale" value={formatCurrency(stats.total)} borderColor="border-lime-500/20" />
                <StatCard label="Minimum" value={formatCurrency(stats.min)} borderColor="border-blue-500/20" />
                <StatCard label="Maximum" value={formatCurrency(stats.max)} borderColor="border-purple-500/20" />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#1a1a1a]/80 border border-[#222] rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-6">Distribution</h3>
                    <div className="h-80">
                        <canvas ref={barChartRef}></canvas>
                    </div>
                </div>
                <div className="bg-[#1a1a1a]/80 border border-[#222] rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-6">Tranches</h3>
                    <div className="h-80">
                        <canvas ref={pieChartRef}></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportPage;