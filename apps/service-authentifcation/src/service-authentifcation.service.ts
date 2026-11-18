
import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';

import { InscriptionDTO } from './dto/inscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
import * as bcrypt from 'bcrypt';
import { ConnexionDTO } from './dto/connection.dto';

@Injectable()
export class ServiceAuthentifcationService {

  constructor(
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepository: Repository<Utilisateur>,
  ) {}

  // Génération du prochain numéro utilisateur
  async numUtilisateur() {

    const dernierUtilisateur = await this.utilisateurRepository.findOne({
      where: {},
      order: {
        idutilisateur: 'DESC'
      }
    });

    let prochainNum = 1;

    if (dernierUtilisateur) {
      const numActu = Number(
        dernierUtilisateur.numutilisateur.replace('UTILS', '')
      );

      prochainNum = numActu + 1;
    }

    const prochainNumutilisateur =
      `UTILS${('000' + prochainNum).slice(-3)}`;

    return {
      numutilisateur: prochainNumutilisateur
    };
  }

  // Inscription utilisateur
  async inscription(data: InscriptionDTO) {

    console.log('Données reçues pour inscription :', data);

    // Vérification des champs obligatoires
    if (
      !data.emailpersonnel ||
      !data.numutilisateur ||
      !data.nom ||
      !data.password ||
      !data.rolepersonnel
    ) {
      throw new BadRequestException(
        'Certains champs obligatoires sont manquants.'
      );
    }

    // Vérification de l'existence de l'email
    const utilisateurExiste = await this.utilisateurRepository.findOne({
      where: {
        emailpersonnel: data.emailpersonnel
      }
    });

    if (utilisateurExiste) {
      throw new BadRequestException(
        'Cette adresse email est déjà utilisée.'
      );
    }

    // Vérification du mot de passe
    if (data.password !== data.confirmpassword) {
      throw new BadRequestException(
        'Les mots de passe ne correspondent pas.'
      );
    }

    if (data.password.length < 8) {
      throw new BadRequestException(
        'Le mot de passe doit contenir au moins 8 caractères.'
      );
    }

    // Cryptage du mot de passe
    const motdePasshash = await bcrypt.hash(data.password, 10);

    try {

      const utilisateur = this.utilisateurRepository.create({

        numutilisateur: data.numutilisateur,
        nom: data.nom,
        prenom: data.prenom,
        datenaiss: data.datenaiss,
        emailpersonnel: data.emailpersonnel,
        motdepass: motdePasshash,
        rolepersonnel: data.rolepersonnel,
        idetablissement: data.idetablissement

      });

      const resultat = await this.utilisateurRepository.save(utilisateur);

      console.log('Utilisateur enregistré :', resultat.idutilisateur);

      return {
        message: 'Inscription réussie !',
        utilisateur: {
          idutilisateur: resultat.idutilisateur,
          numutilisateur: resultat.numutilisateur,
          nom: resultat.nom,
          prenom: resultat.prenom,
          emailpersonnel: resultat.emailpersonnel,
          rolepersonnel: resultat.rolepersonnel
        }
      };

    } catch (error) {

      console.error('Erreur PostgreSQL :', error);

      throw error;
    }
  }

  // Connexion utilisateur
async connection(data: ConnexionDTO) {

  console.log('1 - Données reçues :', data);
  console.log('2 - Email reçu :', data.email);
  console.log('3 - Mot de passe reçu :', data.password);

  const utilisateur = await this.utilisateurRepository
  .createQueryBuilder('utilisateur')
  .addSelect('utilisateur.motdepass')
  .where('utilisateur.emailpersonnel = :email', {
    email: data.email
  })
  .getOne();

  console.log('4 - Utilisateur trouvé :', utilisateur);

  if (!utilisateur) {
    throw new UnauthorizedException('Email incorrect.');
  }

  // Vérification du mot de passe
  if (!data.password) {
    throw new UnauthorizedException('Mot de passe non reçu.');
  }

  if (!utilisateur.motdepass) {
    throw new UnauthorizedException(
      'Le mot de passe est absent dans la base de données.'
    );
  }

  const motdepassCorrecte = await bcrypt.compare(
  data.password,
  utilisateur.motdepass
);

  console.log('5 - Mot de passe correct :', motdepassCorrecte);

  if (!motdepassCorrecte) {
    throw new UnauthorizedException('Mot de passe incorrect.');
  }

  console.log('6 - Rôle demandé :', data.role);
  console.log('7 - Rôle en base :', utilisateur.rolepersonnel);

  if (utilisateur.rolepersonnel !== data.role) {
    throw new UnauthorizedException(
      "Cette fonction n'est pas attribuée à cette adresse email."
    );
  }

  return {
    message: 'Connexion réussie',
    utilisateur: {
      id: utilisateur.idutilisateur,
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      email: utilisateur.emailpersonnel,
      role: utilisateur.rolepersonnel
    }
  };
}
}