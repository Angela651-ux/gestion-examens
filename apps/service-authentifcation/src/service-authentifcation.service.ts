import { BadRequestException, Injectable } from '@nestjs/common';
import { InscriptionDTO } from './dto/inscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
import * as bcrypt from 'bcrypt';
import { ConnexionDTO } from './dto/connection.dto';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ServiceAuthentifcationService {
 
  constructor(
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepository: Repository<Utilisateur>,
  ) {}

 async inscription(data : InscriptionDTO){
 
   const roleAutorise = [
    'admin',
    'enseignant',
    'secretaire',
    'ChefMention'

  ];
if(!roleAutorise.includes(data.role)){
  throw new BadRequestException('Ce role n \'est pas autorisé pour un personnel');
}
  const UtilisateurExiste = await this.utilisateurRepository.findOne({
    where:{
      mailutilisateur :data.email
    }
  });
  if(UtilisateurExiste){
    throw new BadRequestException('Cette adresse email est déja utilisée');
  }

 
 if(data.password !== data.confirmpassword){
    throw new BadRequestException(
      'Les mots de passe ne correnspondent pas'
    );
  }

  const motdePasshash = await bcrypt.hash(data.password, 10);
try{

  const utilisateur = this.utilisateurRepository.create({
  nomutilisateur : data.nom,
  prenomutilisateur: data.prenom,
  telutilisateur: data.tel,
  datenaissutilisateur: data.datenaiss,
  mailutilisateur: data.email,
  motdepass: motdePasshash,
  roleutilisateur : data.role
})

 const resultat = await this.utilisateurRepository.save(utilisateur);

return {
  message: 'inscription réussie!'
}

}catch (error){
console.error('Erreur postgres:',error);
throw error;
}
 }

  async connection(data: ConnexionDTO){

    console.log('1 - Données reçues :', data);
    const utilisateur = await this.utilisateurRepository.findOne({
      where:{
        mailutilisateur : data.email
      }
    });

    console.log('2 - Utilisateur trouvé :', utilisateur);

    if (!utilisateur){
throw new UnauthorizedException('Email incorrecte');
    }

    const motdepassCorrecte =  await bcrypt.compare(
      data.password,
      utilisateur.motdepass,
    );

    console.log('3 - Mot de passe correct :', motdepassCorrecte);
    if(!motdepassCorrecte){
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    console.log('4 - Rôle demandé :', data.role);
console.log('5 - Rôle en base :', utilisateur.roleutilisateur);
    if(utilisateur.roleutilisateur !== data.role){
      throw new UnauthorizedException('Ce fonction n\' est pas attribué a cette email');
    }

    return{
      message: 'Connexion réussie',
      utilisateur:{
        id: utilisateur.idutilisateur,
        nom: utilisateur.nomutilisateur,
        prenom: utilisateur.prenomutilisateur,
        email: utilisateur.mailutilisateur,
        role: utilisateur.roleutilisateur
      }

    };
  }
}
 

  

