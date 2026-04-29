import React from 'react';

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
    <header className="bg-[#1a1a1a]/80 backdrop-blur-md sticky top-0 z-40 border-b border-[#222] px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{MODULE_TITLES[activeModule]}</h2>
          <p className="text-sm text-gray-400">{updateDate()}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;