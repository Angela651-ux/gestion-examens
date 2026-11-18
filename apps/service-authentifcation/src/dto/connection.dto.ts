import { IsEmail, IsNotEmpty, IsEnum, MinLength } from "class-validator";

export enum RolePersonnel{
   ADMINISTRATEUR = 'Admin',
    Responsable_examens= 'RS',
    Agent_scolariter= 'AS',
    Responsable_Mention= 'RM',
    ENSEIGNANT = 'E',
    SURVEILLANT= 'Surveillant',
    President_jury= 'PJ'
   
}

export class ConnexionDTO {
    @IsEnum(RolePersonnel)
    role : RolePersonnel;

    @IsNotEmpty()
    @IsEmail()
    email : string;

    @MinLength(8)
    password : string ;
}