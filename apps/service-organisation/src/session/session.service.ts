import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { session } from './session.entity';
import { Repository } from 'typeorm';
import { sessionDTO } from '../dto/session.dto';

@Injectable()
export class SessionService {
    constructor(@InjectRepository(session)
private readonly sessionRepository: Repository<session>
){}

async prochainCodeSession(){
    const dernierSession = await this.sessionRepository.findOne({
        where: {},
        order:{
            idsession:'DESC',
        }
    })

    let prochainNumSess= 1;

    if(dernierSession){
        const numActu = Number(dernierSession.numsession.replace('N°SESS', ''),
    );
    prochainNumSess = numActu+1;
    }

    const prochainCodeSession = `N°SESS${('000' + prochainNumSess).slice(-3)}`;

    return{ numsession: prochainCodeSession}

}

async enregistrerSession(data: sessionDTO) {

    if (
        !data.numsession ||
        !data.libelesession ||
        !data.typesession ||
        !data.annersession ||
        !data.datedebutsession ||
        !data.datefinsession ||
        !data.statutsession
    ) {
        throw new BadRequestException(
            'Tous les champs obligatoires doivent être renseignés'
        );
    }

    try {

        const nouvelleSession = this.sessionRepository.create({
            numsession: data.numsession,
            libelesession: data.libelesession,
            typesession: data.typesession,
            annersession: data.annersession,
            datedebutsession: data.datedebutsession,
            datefinsession: data.datefinsession,
            statutsession: data.statutsession,
        });

        const sessionEnregistree =
            await this.sessionRepository.save(nouvelleSession);

        console.log('Session enregistrée :', sessionEnregistree);

        return sessionEnregistree;

    } catch (Erreur) {
    console.error("Erreur lors de l'enregistrement :", Erreur);

    throw Erreur;
}
}

async chargerSession(){
    return await this.sessionRepository.find({
        order:{
            idsession:'ASC'
        }
    })
}

async modifierSession(donnee:sessionDTO){
    const sessionExist = await this.sessionRepository.findOne({
        where: {
            idsession: donnee.idsession
        }
    });

    if(!sessionExist){
        throw new NotFoundException('Session introuvable')
    }

    sessionExist.numsession= donnee.numsession,
    sessionExist.libelesession= donnee.libelesession,
    sessionExist.typesession= donnee.typesession,
    sessionExist.annersession= donnee.annersession,
    sessionExist.datedebutsession= donnee.datedebutsession,
    sessionExist.datefinsession= donnee.datefinsession,
    sessionExist.statutsession= donnee.statutsession

    return await this.sessionRepository.save(sessionExist);
}

async supprimerSession(id:number){
    console.log("Id recue par suppSession" , id)

    const sessionExist = await this.sessionRepository.findOne({
        where: {idsession: id},
    });

    if(!sessionExist){
        throw new NotFoundException('Session introuvable')
    }

    await this.sessionRepository.remove(sessionExist);

    return{
        message : 'Session supprimé'
    }

}

}