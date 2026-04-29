import React from 'react';
import type { User } from '../utils/types';

interface SidebarProps {
  currentUser: User;
  activeModule: 'add' | 'list' | 'report';
  onModuleChange: (module: 'add' | 'list' | 'report') => void;
  onLogout: () => void;
}

const NAV_ITEMS = [
  { id: 'add' as const, icon: 'plus-circle', label: 'Ajouter Enseignant' },
  { id: 'list' as const, icon: 'list', label: 'Liste / Gestion' },
  { id: 'report' as const, icon: 'chart-pie', label: 'Bilan & Graphiques' },
];

const Sidebar: React.FC<SidebarProps> = ({ currentUser, activeModule, onModuleChange, onLogout }) => {
  return (
    <aside className="w-72 bg-[#111] border-r border-[#222] fixed h-full z-50">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-[#a3e635] rounded-lg flex items-center justify-center">
            <i className="fas fa-chalkboard-teacher text-[#0a0a0a]">S</i>
          </div>
          <div>
            <h1 className="font-bold text-lg">Salaris</h1>
            <p className="text-xs text-gray-400">Panel Admin</p>
          </div>
        </div>
        <nav className="space-y-2">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => onModuleChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${activeModule === item.id
                  ? 'bg-linear-to-r from-lime-500/15 to-transparent border-l-3 border-[#a3e635] text-white'
                  : 'text-gray-400 hover:bg-[#222] hover:text-white'
                }`}
            >
              <i className={`fas fa-${item.icon} w-5`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#222]">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={`https://ui-avatars.com/api/?name=${currentUser.name}&background=a3e635&color=0a0a0a`}
            className="w-10 h-10 rounded-full"
            alt=""
          />
          <div className="overflow-hidden">
            <p className="font-medium text-sm truncate">{currentUser.name}</p>
            <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-[#333] text-gray-400 hover:bg-[#222] transition-all"
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;