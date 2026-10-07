import { Controller} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ServiceAuthentifcationService } from './service-authentifcation.service';
import { InscriptionDTO } from './dto/inscription.dto';
import { ConnexionDTO } from './dto/connection.dto';

@Controller()
export class ServiceAuthentifcationController {
  constructor(private readonly serviceAuthentifcationService: ServiceAuthentifcationService) {}

  @MessagePattern({ cmd :'inscription'})
  async inscription(data: InscriptionDTO){
    return this.serviceAuthentifcationService.inscription(data);
  }

  @MessagePattern({ cmd: 'connection'})
  async connection (data : ConnexionDTO){
    return this.serviceAuthentifcationService.connection(data);
  }
}
