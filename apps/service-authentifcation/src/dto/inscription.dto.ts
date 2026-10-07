import {IsEmail , IsNotEmpty , IsOptional, IsString, IsEnum, IsDateString , MinLength} from 'class-validator'

export enum RolePersonnel{
    ADMINISTRATEUR = 'admin',
    ENSEIGNANT = 'enseignant',
    SECRETAIRE = 'secretaire',
    CHEFMENTION = 'ChefMention',
}

export class InscriptionDTO{
@IsNotEmpty()
@IsString()
nom: string;

@IsOptional()
@IsString()
prenom?: string;

@IsEmail()
email: string;

@IsDateString()
datenaiss: string;

@IsNotEmpty()
@IsString()
tel: string;

@MinLength(8)
password: string;

@MinLength(8)
confirmpassword: string;

@IsEnum(RolePersonnel)
role: RolePersonnel;


}