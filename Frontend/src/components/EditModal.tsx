import React from 'react';
import type { Teacher } from '../utils/types';
import { FaSave, FaTimes } from 'react-icons/fa';

interface EditModalProps {
    teacher: Teacher;
    onChange: (updated: Teacher) => void;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ teacher, onChange, onSubmit, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60 flex items-center justify-center p-4 animate-fadeIn">

            <div className="bg-white border border-gray-100 rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-scaleIn">

                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-[#876245]">Modifier l'Enseignant</h3>
                        <p className="text-sm text-[#A67C52] font-mono mt-4 font-bold">{teacher.matricule}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">Nom complet</label>
                        <input
                            type="text"
                            value={teacher.nom}
                            onChange={e => onChange({ ...teacher, nom: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 text-gray-800 focus:border-[#D4A574] focus:ring-2 focus:ring-[#876245]/10 focus:outline-none transition-all"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-semibold text-gray-700">Taux (Ar)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={teacher.tauxHoraire}
                                onChange={e => onChange({ ...teacher, tauxHoraire: parseFloat(e.target.value) })}
                                className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 text-gray-800 focus:border-[#D4A574] focus:ring-2 focus:ring-[#876245]/10 focus:outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-semibold text-gray-700">Heures</label>
                            <input
                                type="number"
                                step="0.5"
                                value={teacher.nbreHeures}
                                onChange={e => onChange({ ...teacher, nbreHeures: parseFloat(e.target.value) })}
                                className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 text-gray-800 focus:border-[#D4A574] focus:ring-2 focus:ring-[#876245]/10 focus:outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-100 text-gray-600 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-all"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-[#D4A574] text-[#0a0a0a] font-bold py-3.5 rounded-xl hover:bg-[#A67C52] shadow-lg shadow-[#876245]/20 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                        >
                            <FaSave />
                            Sauvegarder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;