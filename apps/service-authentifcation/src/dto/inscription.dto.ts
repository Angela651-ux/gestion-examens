import {IsEmail , IsNotEmpty , IsOptional, IsString, IsEnum, IsDateString , MinLength, IsInt, Min} from 'class-validator'
import { PrimaryGeneratedColumn } from 'typeorm';
import { Type } from 'class-transformer';

export enum RolePersonnel{
    ADMINISTRATEUR = 'Admin',
    Responsable_examens= 'RS',
    Agent_scolariter= 'AS',
    Responsable_Mention= 'RM',
    ENSEIGNANT = 'E',
    SURVEILLANT= 'Surveillant',
    President_jury= 'PJ'
   
}

export class InscriptionDTO{
@PrimaryGeneratedColumn()
idutilisateur: number;

@IsNotEmpty()
@IsString()
numutilisateur:string;

@IsNotEmpty()
@IsString()
nom: string;

@IsOptional()
@IsString()
prenom?: string;

@IsEmail()
emailpersonnel: string;

@IsDateString()
datenaiss: string;


@MinLength(8)
password: string;

@MinLength(8)
confirmpassword: string;

@IsEnum(RolePersonnel)
rolepersonnel: RolePersonnel;

@Type(() => Number)
@IsInt()
@Min(1)
idetablissement: number;


}