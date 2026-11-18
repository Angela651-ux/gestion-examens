import { Controller } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EvaluationDTO } from '../dto/evaluation.dto';

@Controller('evaluation')
export class EvaluationController {
    constructor (private readonly EvaluationService: EvaluationService){}

    @MessagePattern({cmd : 'code_ev'})
    codeEvaluation(){
        return this.EvaluationService.codeEvaluation();
    }

    @MessagePattern({ cmd: 'enregistrer_Ev'})
    async EnregistrerEval(@Payload() data:EvaluationDTO){
        return this.EvaluationService.EnregistrerEval(data);
    }
}
