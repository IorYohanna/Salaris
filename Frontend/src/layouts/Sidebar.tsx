import React from 'react';
import type { User } from '../utils/types';
import { FaAddressCard, FaChartPie, FaList, FaSignOutAlt } from 'react-icons/fa';

interface SidebarProps {
  currentUser: User;
  activeModule: 'add' | 'list' | 'report';
  onModuleChange: (module: 'add' | 'list' | 'report') => void;
  onLogout: () => void;
}

const NAV_ITEMS = [
  { id: 'add' as const, icon: FaAddressCard, label: 'Ajouter Enseignant' },
  { id: 'list' as const, icon: FaList, label: 'Liste / Gestion' },
  { id: 'report' as const, icon: FaChartPie, label: 'Bilan & Graphiques' },
];

const Sidebar: React.FC<SidebarProps> = ({ currentUser, activeModule, onModuleChange, onLogout }) => {
  return (
    <aside className="w-72 bg-[#876245] fixed h-full z-50 shadow-2xl flex flex-col">
      <div className="p-6 flex-1">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
            <span className="font-bold text-[#D4A574] text-xl">S</span>
          </div>
          <div>
            <h1 className="font-bold text-xl uppercase text-white">Salaris</h1>
            <p className="text-xs text-white font-bold uppercase tracking-wider">Panel Admin</p>
          </div>
        </div>
        <hr className="border-white p-6" />

        <nav className="space-y-2">
          {NAV_ITEMS.map(item => {
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onModuleChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-lg
                  ${isActive
                    ? 'bg-white text-black shadow-lg translate-x-2'
                    : 'text-white hover:bg-white/20 hover:text-black/80'
                  }`}
              >
                <item.icon className={`text-xl ${isActive ? 'text-black' : 'text-white'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-black/10 bg-black/5">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={`https://ui-avatars.com/api/?name=${currentUser.matricule}&background=0a0a0a&color=ffffff`}
            className="w-12 h-12 rounded-full border-2 shadow-md"
            alt="Avatar"
          />
          <div className="overflow-hidden">
            <p className="text-lg font-bold text-white truncate">Utilisateur</p>
            <p className="text-md text-white/60 truncate font-mono">{currentUser.matricule}</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white transition-all font-bold text-md"
        >
          <FaSignOutAlt />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;