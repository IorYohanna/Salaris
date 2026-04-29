import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './auth.entity';
import { OAuth2Client } from 'google-auth-library';

// ⚠️ Remplacez cette valeur par votre vrai Google Client ID
const GOOGLE_CLIENT_ID =
  '1034638553052-skrbe7anmvsk09dilg98v0hdevllvl82.apps.googleusercontent.com';

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private repo: Repository<Auth>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(matricule: string) {
    return this.repo.findOneBy({ matricule });
  }

  create(data: Partial<Auth>) {
    const auth = this.repo.create(data);
    return this.repo.save(auth);
  }

  async remove(matricule: string) {
    return this.repo.delete(matricule);
  }

  async update(matricule: string, data: Partial<Auth>) {
    const auth = await this.repo.preload({
      matricule,
      ...data,
    });

    if (!auth) {
      throw new Error('Auth non trouvé');
    }

    return this.repo.save(auth);
  }

  async login(matricule: string, mdp: string) {
    const user = await this.repo.findOneBy({ matricule });

    if (!user) {
      return { success: false, message: 'Utilisateur introuvable' };
    }

    // L'utilisateur existe mais s'est inscrit via Google (pas de mot de passe)
    if (!user.mdp) {
      return {
        success: false,
        message:
          'Ce compte utilise la connexion Google. Veuillez vous connecter avec Google.',
      };
    }

    if (user.mdp !== mdp) {
      return { success: false, message: 'Mot de passe incorrect' };
    }

    return {
      success: true,
      user: {
        matricule: user.matricule,
      },
    };
  }

  async register(matricule: string, mdp: string) {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.repo.findOneBy({ matricule });

    if (existingUser) {
      return {
        success: false,
        message: 'Un utilisateur avec cet email existe déjà',
      };
    }

    // Créer le nouvel utilisateur
    const newUser = this.repo.create({
      matricule,
      mdp,
      googleId: null, // Pas de Google ID pour une inscription classique
    });

    await this.repo.save(newUser);

    return {
      success: true,
      message: 'Inscription réussie',
      user: {
        matricule: newUser.matricule,
      },
    };
  }

  /**
   * Connexion / Inscription via Google.
   * Vérifie le token côté serveur, puis crée ou retrouve l'utilisateur.
   */
  async googleLogin(token: string) {
    try {
      // 1. Vérification du token Google
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.email) {
        return { success: false, message: 'Token Google invalide' };
      }

      const email = payload.email;
      const googleId = payload.sub; // identifiant unique Google

      // 2. Chercher l'utilisateur par email (matricule)
      let user = await this.repo.findOneBy({ matricule: email });

      if (!user) {
        // 3a. Nouvel utilisateur → inscription automatique
        user = this.repo.create({
          matricule: email,
          mdp: null,
          googleId,
        });
        await this.repo.save(user);
      } else if (!user.googleId) {
        // 3b. Utilisateur classique existant → lier le compte Google
        user.googleId = googleId;
        await this.repo.save(user);
      }

      // 4. Retourner le succès
      return {
        success: true,
        user: {
          matricule: user.matricule,
        },
      };
    } catch (error) {
      console.error('Erreur Google login:', error);
      return {
        success: false,
        message: 'Échec de la vérification du token Google',
      };
    }
  }
}
