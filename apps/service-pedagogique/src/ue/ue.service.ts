import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ue } from './ue.entity';
import { ueDTO } from '../dto/ue.dto';
import { NotFoundError } from 'rxjs';
import { parcours } from '../parcours/parcours.entity';

@Injectable()
export class UeService {

    constructor(
        @InjectRepository(ue)
        private readonly ueRepository: Repository<ue>,

        @InjectRepository(parcours)
        private readonly parcoursRepository : Repository<parcours>
    ){}

async obtenirProchainUE(){
    const dernierUe = await  this.ueRepository.findOne({
    where: {},
        order:{
            idue: 'DESC',
        }
    })

    let prochainNum = 1;

    if(dernierUe){
        const numeroActu = Number(
            dernierUe.codeue.replace('UE',''),
        );
        prochainNum = numeroActu + 1;
    }

   const prochainCodeUE =
  `UE${('000' + prochainNum).slice(-3)}`;

  return{ codeue: prochainCodeUE};
}

async enregistrerUe(data: ueDTO) {
  if (
    !data.codeue ||
    !data.libeleue ||
    !data.statueue ||
    !data.semestre ||
    !data.idparcours
  ) {
    throw new BadRequestException(
      'Tous les champs obligatoires doivent être renseignés',
    );
  }

  const nouvelleUE = this.ueRepository.create({
    codeue: data.codeue,
    libeleue: data.libeleue,
    statueue: data.statueue,
    semestre: data.semestre,
    parcours: { idparcours: data.idparcours },
  });

  return await this.ueRepository.save(nouvelleUE);
}

async obtenirListeUe(){
  return await this.ueRepository.find({
    relations: {
      parcours: true
    },
    order: {
      idue: 'ASC'
    }
  })
}

async modifierUE(donnee:ueDTO){

  const ueExist = await this.ueRepository.findOne({
    where: {
      idue: donnee.idue
    }
});

if(!ueExist){
  throw new NotFoundException('UE introuvable')
}

ueExist.codeue = donnee.codeue,
ueExist.libeleue = donnee.libeleue,
ueExist.statueue = donnee.statueue,
ueExist.semestre= donnee.semestre

const parcourExist = await this.parcoursRepository.findOne({
  where:{
    idparcours: donnee.idparcours
  }
});

if(!parcourExist){
  throw new NotFoundException('Parcours Introvable')
}

ueExist.parcours= parcourExist;

return await this.ueRepository.save(ueExist);

}

async supprimerUe(id: number){
const ueExist = await this.ueRepository.findOne({
  where: {idue:id},
});
if(!ueExist){
   throw new  NotFoundException('UE introuvable')
}

await this.ueRepository.remove(ueExist);

return{
  message: 'UE supprimée avec succès'
}
}
}