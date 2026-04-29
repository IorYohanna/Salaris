import React, { useState } from 'react';
import { createTeacher } from '../api/teacherApi';

interface AddTeacherPageProps {
    onSuccess: () => void;
    showToast: (message: string, type: 'success' | 'error') => void;
}

const AddTeacherPage: React.FC<AddTeacherPageProps> = ({ onSuccess, showToast }) => {
    const [form, setForm] = useState({
        matricule: '',
        nom: '',
        tauxHoraire: '',
        nbreHeures: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createTeacher({
                matricule: form.matricule,
                nom: form.nom,
                tauxHoraire: parseFloat(form.tauxHoraire),
                nbreHeures: parseFloat(form.nbreHeures),
            });
            showToast('Enseignant ajouté avec succès !', 'success');
            setForm({ matricule: '', nom: '', tauxHoraire: '', nbreHeures: '' });
            onSuccess();
        } catch {
            showToast("Erreur lors de l'ajout", 'error');
        }
    };

    return (
        <div className="max-w-2xl animate-fadeIn">
            <div className="bg-[#1a1a1a]/80 border border-lime-500/20 rounded-2xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="labelTheme">Matricule</label>
                            <input
                                type="text"
                                placeholder="EX: ENS001"
                                required
                                value={form.matricule}
                                onChange={e => setForm({ ...form, matricule: e.target.value })}
                                className="inputTheme"
                            />
                        </div>
                        <div>
                            <label className="labelTheme">Nom complet</label>
                            <input
                                type="text"
                                placeholder="Nom et prénom"
                                required
                                value={form.nom}
                                onChange={e => setForm({ ...form, nom: e.target.value })}
                                className="inputTheme"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="labelTheme">Taux horaire (€)</label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                value={form.tauxHoraire}
                                onChange={e => setForm({ ...form, tauxHoraire: e.target.value })}
                                className="inputTheme"
                            />
                        </div>
                        <div>
                            <label className="labelTheme">Nombre d'heures</label>
                            <input
                                type="number"
                                step="0.5"
                                required
                                value={form.nbreHeures}
                                onChange={e => setForm({ ...form, nbreHeures: e.target.value })}
                                className="inputTheme"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#a3e635] hover:bg-[#84cc16] text-[#0a0a0a] font-semibold py-3 rounded-xl transition-all"
                    >
                        Enregistrer dans la base de données
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTeacherPage;