import React, { useState, useEffect } from "react";
import type { Teacher, User } from "./utils/types";
import { getAllTeachers } from "./api/teacherApi";
import { login, googleLogin, register } from "./api/authApi";

import { GoogleOAuthProvider } from "@react-oauth/google";

import Toast from "./components/Toast";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"; 
import AddTeacherPage from "./pages/AddTeacherPage";
import ListPage from "./pages/ListPage";
import ReportPage from "./pages/ReportagePage";

const GOOGLE_CLIENT_ID =
  "1034638553052-skrbe7anmvsk09dilg98v0hdevllvl82.apps.googleusercontent.com";

const App = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeModule, setActiveModule] = useState<"add" | "list" | "report">(
    "list",
  );
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({ message: "", type: "" });

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    loadTeachers();
  }, []);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const formatCurrency = (num: number) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(num);

  const loadTeachers = async () => {
    try {
      const data = await getAllTeachers();
      setTeachers(data);
    } catch {
      showToast("Impossible de charger les enseignants", "error");
    }
  };

  /** Connexion classique */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const matricule = (
      document.getElementById("loginEmail") as HTMLInputElement
    ).value;
    const mdp = (document.getElementById("loginPassword") as HTMLInputElement)
      .value;

    try {
      const res = await login(matricule, mdp);
      if (res.success && res.user) {
        setCurrentUser(res.user);
        localStorage.setItem("currentUser", JSON.stringify(res.user));
        showToast("Connexion réussie !", "success");
      } else {
        showToast(res.message ?? "Erreur de connexion", "error");
      }
    } catch {
      showToast("Erreur de connexion au serveur", "error");
    }
  };

  /** Inscription classique */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const matricule = (
      document.getElementById("loginEmail") as HTMLInputElement
    ).value;
    const mdp = (document.getElementById("loginPassword") as HTMLInputElement)
      .value;

    try {
      const res = await register(matricule, mdp);
      if (res.success && res.user) {
        setCurrentUser(res.user);
        localStorage.setItem("currentUser", JSON.stringify(res.user));
        showToast("Inscription réussie !", "success");
      } else {
        showToast(res.message ?? "Erreur d'inscription", "error");
      }
    } catch {
      showToast("Erreur de connexion au serveur", "error");
    }
  };

  const handleGoogleLogin = async (credential: string) => {
    try {
      const res = await googleLogin(credential);
      if (res.success && res.user) {
        setCurrentUser(res.user);
        localStorage.setItem("currentUser", JSON.stringify(res.user));
        showToast("Connexion Google réussie !", "success");
      } else {
        showToast(res.message ?? "Erreur Google", "error");
      }
    } catch {
      showToast("Erreur de connexion Google au serveur", "error");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    showToast("Déconnexion réussie", "success");
  };

  if (!currentUser) {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Toast message={toast.message} type={toast.type} />
        {authMode === "login" ? (
          <LoginPage
            onLogin={handleLogin}
            onGoogleLogin={handleGoogleLogin}
            switchToRegister={() => setAuthMode("register")}
          />
        ) : (
          <RegisterPage
            onRegister={handleRegister}
            onGoogleLogin={handleGoogleLogin}
            switchToLogin={() => setAuthMode("login")}
          />
        )}
      </GoogleOAuthProvider>
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
          {activeModule === "add" && (
            <AddTeacherPage onSuccess={loadTeachers} showToast={showToast} />
          )}

          {activeModule === "list" && (
            <ListPage
              teachers={teachers}
              onRefresh={loadTeachers}
              showToast={showToast}
              formatCurrency={formatCurrency}
            />
          )}

          {activeModule === "report" && (
            <ReportPage teachers={teachers} formatCurrency={formatCurrency} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
