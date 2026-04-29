import React from "react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";

interface RegisterPageProps {
  onRegister: (e: React.FormEvent) => void;
  onGoogleLogin: (credential: string) => void;
  switchToLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({
  onRegister,
  onGoogleLogin,
  switchToLogin,
}) => {
  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      onGoogleLogin(credentialResponse.credential);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4 font-sans">
      <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-lime-500/30 rounded-2xl p-8 w-full max-w-md">
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 border-2 border-[#a3e635] rounded-xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-user-plus text-2xl text-[#a3e635]"></i>
          </div>
          <h1 className="text-2xl font-bold mb-2">Inscription</h1>
          <p className="text-gray-400 text-sm">
            Créez votre compte pour accéder au système Salaris
          </p>
        </div>

        {/* Formulaire d'inscription */}
        <form onSubmit={onRegister} className="space-y-5">
          <div>
            <label className="labelTheme">Email</label>
            <div className="relative">
              <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
              <input
                type="email"
                id="loginEmail" // Gardé identique pour ton document.getElementById dans App.tsx
                placeholder="votre@email.com"
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
                id="loginPassword" // Gardé identique pour ton document.getElementById
                placeholder="Choisissez un mot de passe"
                required
                className="inputTheme"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#a3e635] hover:bg-[#84cc16] text-[#0a0a0a] font-semibold py-3 rounded-xl transition-all"
          >
            S'inscrire
          </button>
        </form>

        {/* Lien vers Login */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Déjà un compte ?{" "}
            <button
              onClick={switchToLogin}
              className="text-[#a3e635] font-semibold hover:underline"
            >
              Se connecter
            </button>
          </p>
        </div>

        {/* Séparateur */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="text-gray-500 text-sm">ou</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        {/* Bouton Google */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.error("Échec Google")}
            theme="filled_black"
            shape="rectangular"
            size="large"
            text="signup_with"
            locale="fr"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
