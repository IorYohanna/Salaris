import React from 'react';
import { FaCalendar } from 'react-icons/fa';

interface HeaderProps {
  activeModule: 'add' | 'list' | 'report';
}

const MODULE_TITLES: Record<string, string> = {
  add: 'Ajouter Enseignant',
  list: 'Liste des Enseignants',
  report: 'Bilan & Statistiques',
};

const Header: React.FC<HeaderProps> = ({ activeModule }) => {
  const updateDate = () =>
    new Date().toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <header className="bg-[#876245]/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 px-8 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {MODULE_TITLES[activeModule]}
          </h2>
          <div className="h-1 w-56 bg-white rounded-full mt-1"></div>
        </div>

        <div className="text-right">
          <p className="text-sm font-medium items-center flex text-gray-500 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
            <FaCalendar className=" mr-2 text-gray-400" />
            <span className="capitalize">{updateDate()}</span>
          </p>
        </div>

      </div>
    </header>
  );
};

export default Header;