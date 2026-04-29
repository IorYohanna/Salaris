import React, { useState } from 'react';
import type { Teacher } from '../utils/types';

interface TeacherTableProps {
    teachers: Teacher[];
    onEdit: (teacher: Teacher) => void;
    onDelete: (matricule: string) => void;
    onRefresh: () => void;
    formatCurrency: (num: number) => string;
}

const TeacherTable: React.FC<TeacherTableProps> = ({
    teachers,
    onEdit,
    onDelete,
    onRefresh,
    formatCurrency,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');

    const filtered = teachers.filter(t => {
        const matchesSearch =
            t.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.matricule.toLowerCase().includes(searchQuery.toLowerCase());
        const prestation = t.prestation ?? t.tauxHoraire * t.nbreHeures;
        if (filter === 'high') return matchesSearch && prestation > 2000;
        if (filter === 'low') return matchesSearch && prestation < 1000;
        return matchesSearch;
    });

    return (
        <div className="bg-[#1a1a1a]/80 border border-lime-500/20 rounded-2xl overflow-hidden animate-fadeIn">
            <div className="p-6 border-b border-[#222] flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="bg-[#222] border border-[#333] rounded-xl py-2 px-4 text-white w-64 outline-none focus:border-[#a3e635]"
                    />
                    <select
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        className="bg-[#222] border border-[#333] rounded-xl py-2 px-4 text-white"
                    >
                        <option value="all">Tous</option>
                        <option value="high">{'>'} 2000€</option>
                        <option value="low">{'<'} 1000€</option>
                    </select>
                </div>
                <button onClick={onRefresh} className="text-gray-400 hover:text-[#a3e635]">
                    <i className="fas fa-sync-alt"></i>
                </button>
            </div>


            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-[#222]/50">
                        <tr>
                            <th className="column">Matricule</th>
                            <th className="column">Nom</th>
                            <th className="column">Taux</th>
                            <th className="column">Heures</th>
                            <th className="text-left py-4 px-6 text-sm text-[#a3e635]">Prestation</th>
                            <th className="column">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#222]">
                        {filtered.map(teacher => (
                            <tr key={teacher.matricule} className="hover:bg-[#222]/30 transition-all">
                                <td className="py-4 px-6 font-mono text-sm">{teacher.matricule}</td>
                                <td className="py-4 px-6 font-medium">{teacher.nom}</td>
                                <td className="py-4 px-6 text-gray-400">{formatCurrency(teacher.tauxHoraire)}/h</td>
                                <td className="py-4 px-6 text-gray-400">{teacher.nbreHeures}h</td>
                                <td className="py-4 px-6">
                                    <span className="text-[#a3e635] font-semibold">
                                        {formatCurrency(teacher.prestation ?? teacher.tauxHoraire * teacher.nbreHeures)}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onEdit(teacher)}
                                            className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
                                        >
                                            <i className="fas fa-edit text-sm"></i>
                                        </button>
                                        <button
                                            onClick={() => onDelete(teacher.matricule)}
                                            className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                                        >
                                            <i className="fas fa-trash text-sm"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherTable;