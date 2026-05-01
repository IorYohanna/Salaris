import React, { useState } from 'react';
import { createTeacher } from '../api/teacherApi';
import { FaCalculator, FaIdBadge, FaTimes } from 'react-icons/fa';

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

    // Calcul de l'estimation en temps réel
    const rate = parseFloat(form.tauxHoraire) || 0;
    const hours = parseFloat(form.nbreHeures) || 0;
    const estimation = rate * hours;

    const handleReset = () => {
        setForm({ matricule: '', nom: '', tauxHoraire: '', nbreHeures: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createTeacher({
                matricule: form.matricule,
                nom: form.nom,
                tauxHoraire: rate,
                nbreHeures: hours,
            });
            showToast('Enseignant ajouté avec succès !', 'success');
            handleReset();
            onSuccess();
        } catch (e: any){
            showToast(e.message, 'error');
        }
    };

    return (
      <div className="max-w-4xl mx-auto flex justify-center items-start pt-6 pb-10 animate-fadeIn">
        <div className="bg-white border border-[#A67C52] rounded-xl p-8 w-full max-w-2xl shadow-3xl shadow-gray-100">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-[#876245]">
              Nouvel Enseignant
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Remplissez les informations pour l'enregistrement
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Matricule
                </label>
                <input
                  type="text"
                  placeholder=" EX: ENS001"
                  required
                  value={form.matricule}
                  onChange={(e) =>
                    setForm({ ...form, matricule: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 text-gray-800 focus:border-[#D4A574] focus:ring-2 focus:ring-[#876245]/10 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Nom complet
                </label>
                <input
                  type="text"
                  placeholder="Nom et prénom"
                  required
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 text-gray-800 focus:border-[#D4A574] focus:ring-2 focus:ring-[#876245]/10 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Taux horaire (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="Ex: 18Ar/h"
                  value={form.tauxHoraire}
                  onChange={(e) =>
                    setForm({ ...form, tauxHoraire: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 text-gray-800 focus:border-[#D4A574] focus:ring-2 focus:ring-[#876245]/10 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Nombre d'heures
                </label>
                <input
                  type="number"
                  step="0.5"
                  required
                  placeholder="Ex: 12 Ar"
                  value={form.nbreHeures}
                  onChange={(e) =>
                    setForm({ ...form, nbreHeures: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 text-gray-800 focus:border-[#D4A574] focus:ring-2 focus:ring-[#876245]/10 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="bg-[#876245]/5 border-2 shadow-lg border-dashed border-[#D4A574]/30 rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#876245] shadow-sm">
                  <FaCalculator className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#876245] uppercase tracking-wider">
                    Estimation Prestation
                  </p>
                  <p className="text-gray-500 text-xs">
                    Calcul basé sur le taux et les heures
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#876245]">
                   {estimation.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-4 rounded-2xl transition-all"
              >
                <FaTimes />
                Annuler
              </button>
              <button
                type="submit"
                className="flex-2 bg-[#D4A574] hover:bg-[#A67C52] text-[#0a0a0a] font-bold py-4 rounded-2xl shadow-lg shadow-[#876245]/20 transition-all transform active:scale-[0.98]"
              >
                Enregistrer l'enseignant
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default AddTeacherPage;