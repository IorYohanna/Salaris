// ⚠️ Adaptez BASE_URL à l'URL de votre backend
const BASE_URL = "http://localhost:3000";

/**
 * Connexion classique avec matricule (email) et mot de passe.
 */
export async function login(matricule: string, mdp: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ matricule, mdp }),
  });

  if (!res.ok) {
    throw new Error(`Erreur serveur : ${res.status}`);
  }

  return res.json() as Promise<{
    success: boolean;
    message?: string;
    user?: { matricule: string };
  }>;
}

// À ajouter à la fin de votre fichier authApi.ts

/**
 * Inscription classique avec matricule (email) et mot de passe.
 */
export async function register(matricule: string, mdp: string) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ matricule, mdp }),
  });

  if (!res.ok) {
    throw new Error(`Erreur serveur : ${res.status}`);
  }

  return res.json() as Promise<{
    success: boolean;
    message?: string;
    user?: { matricule: string };
  }>;
}

/**
 * Connexion / Inscription via Google.
 * @param credential  Le token JWT renvoyé par le bouton Google (OneTagToken / id_token).
 */
export async function googleLogin(credential: string) {
  const res = await fetch(`${BASE_URL}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential }),
  });

  if (!res.ok) {
    throw new Error(`Erreur serveur : ${res.status}`);
  }

  return res.json() as Promise<{
    success: boolean;
    message?: string;
    user?: { matricule: string };
  }>;
}
