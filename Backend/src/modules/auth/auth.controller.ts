import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** Connexion classique */
  @Post('login')
  login(@Body() body: { matricule: string; mdp: string }) {
    return this.authService.login(body.matricule, body.mdp);
  }

  // À l'intérieur de export class AuthController { ... }

  /** Inscription classique */
  @Post('register')
  register(@Body() body: { matricule: string; mdp: string }) {
    return this.authService.register(body.matricule, body.mdp);
  }

  /**
   * Connexion / Inscription via Google.
   * Le frontend envoie le credential (token JWT) renvoyé par le bouton Google.
   */
  @Post('google')
  googleLogin(@Body() body: { credential: string }) {
    return this.authService.googleLogin(body.credential);
  }
}
