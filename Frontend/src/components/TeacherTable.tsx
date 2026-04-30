import React, { useState } from 'react';
import type { Teacher } from '../utils/types';
import { FaEdit, FaSyncAlt, FaTrash, FaSearch } from 'react-icons/fa';

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
        <div className="bg-white border border-[#A67C52] rounded-3xl overflow-hidden shadow-sm animate-fadeIn">
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                            type="text"
                            placeholder="Rechercher un enseignant..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-gray-700 w-full md:w-64 outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#876245]/10 transition-all"
                        />
                    </div>
                    <select
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        className="bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 text-gray-600 outline-none focus:border-[#D4A574] cursor-pointer"
                    >
                        <option value="all">Tous les Enseignants</option>
                        <option value="high">Prestation &gt; 2000Ar</option>
                        <option value="low">Prestation &lt; 1000Ar</option>
                    </select>
                </div>

                <button
                    onClick={onRefresh}
                    className="p-2 text-gray-400 hover:text-[#876245] hover:bg-[#876245]/10 rounded-lg transition-colors"
                    title="Actualiser"
                >
                    <FaSyncAlt className="text-lg" />
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">Matricule</th>
                            <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">Nom</th>
                            <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">Taux</th>
                            <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">Heures</th>
                            <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#876245]">Prestation</th>
                            <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filtered.length > 0 ? (
                            filtered.map(teacher => (
                                <tr key={teacher.matricule} className="hover:bg-[#876245]/5 transition-all group">
                                    <td className="py-4 px-6 font-mono text-sm text-gray-600">{teacher.matricule}</td>
                                    <td className="py-4 px-6 font-semibold text-gray-800">{teacher.nom}</td>
                                    <td className="py-4 px-6 text-gray-500">{formatCurrency(teacher.tauxHoraire)}/h</td>
                                    <td className="py-4 px-6 text-gray-500">{teacher.nbreHeures}h</td>
                                    <td className="py-4 px-6">
                                        <span className="text-[#876245] font-bold">
                                            {formatCurrency(teacher.prestation ?? teacher.tauxHoraire * teacher.nbreHeures)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => onEdit(teacher)}
                                                className="p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                                                title="Modifier"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => onDelete(teacher.matricule)}
                                                className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                title="Supprimer"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="py-12 text-center text-gray-400 italic">
                                    Aucun enseignant trouvé...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherTable;