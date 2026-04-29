import React, { useState, useEffect } from 'react';
import type { Teacher, User } from './utils/types';
import { getAllTeachers, fetchUsers } from './api/teacherApi';

import Toast from './components/Toast';
import Sidebar from './layouts/Sidebar';
import Header from './layouts/Header';
import LoginPage from './pages/LoginPage';
import AddTeacherPage from './pages/AddTeacherPage';
import ListPage from './pages/ListPage';
import ReportPage from './pages/ReportagePage';

const App = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeModule, setActiveModule] = useState<'add' | 'list' | 'report'>('list');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | '' }>({
    message: '',
    type: '',
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    loadTeachers();
  }, []);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000);
  };

  const formatCurrency = (num: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(num);

  const loadTeachers = async () => {
    try {
      const data = await getAllTeachers();
      setTeachers(data);
    } catch {
      showToast('Impossible de charger les enseignants', 'error');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (document.getElementById('loginEmail') as HTMLInputElement).value;
    const password = (document.getElementById('loginPassword') as HTMLInputElement).value;

    try {
      const users = await fetchUsers();
      const user = users.find(u => u.email === email && u.password === password);

      if (user || (email === 'admin@gestion.com' && password === 'password123')) {
        const sessionUser = user || { email, name: 'Administrateur' };
        setCurrentUser(sessionUser);
        localStorage.setItem('currentUser', JSON.stringify(sessionUser));
        showToast('Connexion réussie !', 'success');
      } else {
        showToast('Identifiants incorrects', 'error');
      }
    } catch {
      showToast('Erreur de connexion au serveur', 'error');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    showToast('Déconnexion réussie', 'success');
  };

  if (!currentUser) {
    return (
      <>
        <Toast message={toast.message} type={toast.type} />
        <LoginPage onLogin={handleLogin} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans">
      <Toast message={toast.message} type={toast.type} />

      <Sidebar
        currentUser={currentUser}
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        onLogout={handleLogout}
      />

      <main className="flex-1 ml-72">
        <Header activeModule={activeModule} />

        <div className="p-8">
          {activeModule === 'add' && (
            <AddTeacherPage
              onSuccess={loadTeachers}
              showToast={showToast}
            />
          )}

          {activeModule === 'list' && (
            <ListPage
              teachers={teachers}
              onRefresh={loadTeachers}
              showToast={showToast}
              formatCurrency={formatCurrency}
            />
          )}

          {activeModule === 'report' && (
            <ReportPage
              teachers={teachers}
              formatCurrency={formatCurrency}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;