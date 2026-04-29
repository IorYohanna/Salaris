import React from "react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";

interface LoginPageProps {
  onLogin: (e: React.FormEvent) => void;
  onGoogleLogin: (credential: string) => void;
  switchToRegister: () => void; // Prop ajoutée pour basculer vers l'inscription
}

const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  onGoogleLogin,
  switchToRegister,
}) => {
  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      onGoogleLogin(credentialResponse.credential);
    }
  };

  const handleGoogleError = () => {
    console.error("Échec de la connexion Google");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4 font-sans">
      <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-lime-500/30 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#a3e635] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-lime-500/20">
            <i className="fas fa-chalkboard-teacher text-2xl text-[#0a0a0a]"></i>
          </div>
          <h1 className="text-2xl font-bold mb-2">Salaris</h1>
          <p className="text-gray-400 text-sm">
            Connectez-vous pour accéder au système
          </p>
        </div>

        {/* Formulaire classique */}
        <form onSubmit={onLogin} className="space-y-5">
          <div>
            <label className="labelTheme block mb-2 text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
              <input
                type="email"
                id="loginEmail"
                defaultValue="admin@gestion.com"
                required
                className="inputTheme w-full bg-[#2a2a2a] border border-gray-700 rounded-xl py-3 px-11 focus:border-lime-500 focus:outline-none transition-colors"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div>
            <label className="labelTheme block mb-2 text-sm font-medium">
              Mot de passe
            </label>
            <div className="relative">
              <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
              <input
                type="password"
                id="loginPassword"
                defaultValue="password123"
                required
                className="inputTheme w-full bg-[#2a2a2a] border border-gray-700 rounded-xl py-3 px-11 focus:border-lime-500 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#a3e635] hover:bg-[#84cc16] text-[#0a0a0a] font-bold py-3 rounded-xl transition-all transform active:scale-[0.98]"
          >
            Se connecter
          </button>
        </form>

        {/* Lien vers l'inscription */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Pas encore de compte ?{" "}
            <button
              onClick={switchToRegister}
              className="text-[#a3e635] font-semibold hover:underline transition-all"
            >
              S'inscrire gratuitement
            </button>
          </p>
        </div>

        {/* Séparateur */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-800" />
          <span className="text-gray-600 text-xs uppercase tracking-wider">
            ou
          </span>
          <div className="flex-1 h-px bg-gray-800" />
        </div>

        {/* Bouton Google */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="filled_black"
            shape="rectangular"
            size="large"
            text="signin_with"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
