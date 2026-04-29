import React from 'react';
import type { Teacher } from '../utils/types';

interface EditModalProps {
    teacher: Teacher;
    onChange: (updated: Teacher) => void;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ teacher, onChange, onSubmit, onClose }) => {
    return (
        <div className="modal">
            <div className="bg-[#1a1a1a] border border-lime-500/30 rounded-2xl p-8 max-w-lg w-full">
                <h3 className="text-xl font-semibold mb-6">Modifier : {teacher.matricule}</h3>
                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="labelTheme">Nom complet</label>
                        <input
                            type="text"
                            value={teacher.nom}
                            onChange={e => onChange({ ...teacher, nom: e.target.value })}
                            className="inputTheme"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="labelTheme">Taux (€)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={teacher.tauxHoraire}
                                onChange={e => onChange({ ...teacher, tauxHoraire: parseFloat(e.target.value) })}
                                className="inputTheme"
                                required
                            />
                        </div>
                        <div>
                            <label className="labelTheme">Heures</label>
                            <input
                                type="number"
                                step="0.5"
                                value={teacher.nbreHeures}
                                onChange={e => onChange({ ...teacher, nbreHeures: parseFloat(e.target.value) })}
                                className="inputTheme"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                        <button
                            type="submit"
                            className="flex-1 bg-[#a3e635] text-[#0a0a0a] font-bold py-3 rounded-xl hover:bg-[#84cc16]"
                        >
                            Sauvegarder
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="cancelButton"
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;