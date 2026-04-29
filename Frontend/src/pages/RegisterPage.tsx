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
    <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center p-4 font-sans">
      
      <div className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-md shadow-xl">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold uppercase text-gray-800 mb-2">Inscription</h1>
          <p className="text-gray-500 text-sm">
            Créez votre compte pour accéder au système Salaris
          </p>
        </div>

        <form onSubmit={onRegister} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
            <div className="relative">
              <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="email"
                id="registerEmail" 
                placeholder="votre@email.com"
                required
                className="w-full bg-white border border-gray-300 rounded-xl py-3 px-11 text-gray-800 focus:border-[#D4A574] focus:ring-2 focus:ring-[#876245]/10 focus:outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Mot de passe</label>
            <div className="relative">
              <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="password"
                id="registerPassword"
                placeholder="Choisissez un mot de passe"
                required
                className="w-full bg-white border border-gray-300 rounded-xl py-3 px-11 text-gray-800 focus:border-[#D4A574] focus:ring-2 focus:ring-[#876245]/10 focus:outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#876245] hover:bg-[#6B4C35] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#876245]/20 transition-all transform active:scale-[0.98]"
          >
            S'inscrire
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Déjà un compte ?{" "}
            <button
              onClick={switchToLogin}
              className="text-[#876245] font-bold hover:text-[#6B4C35] hover:underline transition-all"
            >
              Se connecter
            </button>
          </p>
        </div>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-xs uppercase tracking-wider font-medium">ou</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.error("Échec Google")}
            theme="outline"
            shape="rectangular"
            size="large"
            text="signup_with"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;