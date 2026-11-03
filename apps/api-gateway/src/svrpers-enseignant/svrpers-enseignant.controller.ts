import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Enseignant } from './enseignant.interface';
import { firstValueFrom } from 'rxjs';

@Controller('svrpers-enseignant')
export class SvrpersEnseignantController {
    constructor(
        @Inject('PERS_SERVICE')
        private readonly personnelClient : ClientProxy,

        @Inject('AUTH_SERVICE')
        private readonly authClient: ClientProxy
    ){}

   @Get('enseignant')
async listeEnseignant() {

  const enseignants: Enseignant[] = await firstValueFrom(
    this.personnelClient.send<Enseignant[]>(
      { cmd: 'liste_enseignant' },
      {},
    ),
  );

  const resultat = await Promise.all(
    enseignants.map(async (ens: Enseignant) => {

      const utilisateur = await firstValueFrom(
        this.authClient.send(
          { cmd: 'trouver_utilisateur_par_id' },
          ens.idutilisateur,
        ),
      );

      return {
        ...ens,
        nomutilisateur: utilisateur?.nomutilisateur ?? '',
        prenomutilisateur: utilisateur?.prenomutilisateur ?? '',
      };
    }),
  );

  return resultat;
}
    
}

