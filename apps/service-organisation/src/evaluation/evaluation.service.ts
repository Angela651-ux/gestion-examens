import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Evaluation } from './evaluation.entity';
import { Repository } from 'typeorm';
import { EvaluationDTO } from '../dto/evaluation.dto';
import { concerner } from '../concerner/concerner.entity';

@Injectable()
export class EvaluationService {
    constructor(
    @InjectRepository(Evaluation)
    private readonly EvaluationRepository : Repository<Evaluation>,

    @InjectRepository(concerner)
    private readonly ConcernerRepository: Repository<concerner>
    ){}


    async codeEvaluation(){
        const dernierEv = await this.EvaluationRepository.findOne({
            where: {},
            order: {
                idevaluation: 'DESC',
            }
        })

        let prochainEV = 1;

        if(dernierEv){
            const numActuEv = Number(dernierEv.codeevaluation.replace('Ec',''),
        );
        prochainEV = numActuEv +1 ;

        }
        const prochianCodeEv = `EVAL${('000' + prochainEV).slice(-3)}`;

        return{ codeevaluation: prochianCodeEv};

    }

 async EnregistrerEval(data: EvaluationDTO) {
  try {
    return await this.EvaluationRepository.manager.transaction(
      async (manager) => {

        const nouvelleEvaluation = manager.create(Evaluation, {
          codeevaluation: data.codeevaluation,
          dateevaluation: new Date(data.dateevaluation),
          typeepreuve: data.typeepreuve,
          statutevaluation: data.statutevaluation,
          idchef: data.idchef,
          session: { idsession: data.idsession },
        });

        const evaluationEnregistree =
          await manager.save(Evaluation, nouvelleEvaluation);

        console.log('Évaluation enregistrée :', evaluationEnregistree);

        const nouvelleAssociation = manager.create(concerner, {
          idevaluation: evaluationEnregistree.idevaluation,
          idec: data.idec,
        });

        console.log('Association à enregistrer :', nouvelleAssociation);

        await manager.save(concerner, nouvelleAssociation);

        return {
          message: 'Évaluation enregistrée avec succès',
          evaluation: evaluationEnregistree,
        };
      },
    );
  } catch (error) {
    console.error('ERREUR ENREGISTREMENT ÉVALUATION :', error);
    throw error;
  }
}
}