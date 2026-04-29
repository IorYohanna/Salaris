import React from 'react';

interface LoginPageProps {
  onLogin: (e: React.FormEvent) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4 font-sans">
      <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-lime-500/30 rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#a3e635] rounded-xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-chalkboard-teacher text-2xl text-[#0a0a0a]"></i>
          </div>
          <h1 className="text-2xl font-bold mb-2">Salaris</h1>
          <p className="text-gray-400 text-sm">Connectez-vous pour accéder au système</p>
        </div>

        <form onSubmit={onLogin} className="space-y-5">
          <div>
            <label className="labelTheme">Email</label>
            <div className="relative">
              <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
              <input
                type="email"
                id="loginEmail"
                defaultValue="admin@gestion.com"
                required
                className="inputTheme"
              />
            </div>
          </div>

          <div>
            <label className="labelTheme">Mot de passe</label>
            <div className="relative">
              <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
              <input
                type="password"
                id="loginPassword"
                defaultValue="password123"
                required
                className="inputTheme"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#a3e635] hover:bg-[#84cc16] text-[#0a0a0a] font-semibold py-3 rounded-xl transition-all"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;