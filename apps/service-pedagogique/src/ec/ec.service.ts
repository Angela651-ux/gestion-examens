import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ec } from './ec.entity';
import { Repository } from 'typeorm';
import { ue } from '../ue/ue.entity';
import { ecDTO } from '../dto/ec.dto';


@Injectable()
export class EcService {

    constructor(
        @InjectRepository(ec)
        private readonly ecRepository : Repository<ec>,

        @InjectRepository(ue)
        private readonly ueRepository: Repository<ue>
    ){}

    async listeUe(){
        return await this.ueRepository.find({
            select:{
                idue: true,
                codeue: true,
                libeleue: true,
            }
        })

    }

    async CodeEC(){
        const dernierEC = await this.ecRepository.findOne({
            where:{},
            order: {
                idec: 'DESC',
            }
        })

        let prochainNumEC = 1;

        if(dernierEC){
            const numActu = Number(dernierEC.numec.replace('EC', ''),
        );
        prochainNumEC = numActu +1;

        }

        const prochainCodeEC = `EC${('000' + prochainNumEC).slice(-3)}`;

        return{ numec : prochainCodeEC};
    }

    async AjoutEC(data: ecDTO){
        if(
            !data.numec ||
            !data.nomec ||
            !data.credit||
            !data.idenseignant||
            !data.idue
        ){
            throw new BadRequestException(
                'Tous les champs obligatoires doivent etre renseignés',
            );
        }

         const nouvelleEC = this.ecRepository.create({
            numec: data.numec,
            nomec: data.nomec,
            credit: data.credit,
            idenseignant: data.idenseignant,
            ue: {idue: data.idue},

         });

         return await this.ecRepository.save(nouvelleEC);
    }

    async obtenirListeEC(){
        return await this.ecRepository.find({
            relations:{
                ue: true
            },
            order:{
                idec: 'ASC'
            }
        })
    }

    async modifierEC(donnee:ecDTO){
        const ecExist = await this.ecRepository.findOne({
            where: {
                idec: donnee.idec
            }
        });

        if(!ecExist){
            throw new NotFoundException('Ec introuvable')
        }

        ecExist.numec= donnee.numec,
        ecExist.nomec= donnee.nomec,
        ecExist.credit= donnee.credit,
        ecExist.idenseignant= donnee.idenseignant

        const UeExist = await this.ueRepository.findOne({
            where:{
                idue: donnee.idue
            }
        });

        if(!UeExist){
            throw new NotFoundException('Ue introuvable')
        }

        ecExist.ue = UeExist;

        return await this.ecRepository.save(ecExist);
    }

    async supprimerEC(id: number){

          console.log("ID reçu par supprimerEC :", id);


        const ecExist= await this.ecRepository.findOne({
            where: {idec: id},
        });

        if(!ecExist){
            throw new NotFoundException('Ec introuvable')
        }

        await this.ecRepository.remove(ecExist);

        return{
            message : 'EC supprimée avec succèes'
        }

    }
}
