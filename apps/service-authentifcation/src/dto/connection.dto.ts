import { IsEmail, IsNotEmpty, IsEnum, MinLength } from "class-validator";

export enum RolePersonnel{
    ADMINISTRATEUR = 'admin',
    ENSEIGNANT = 'enseignant',
    SECRETAIRE = 'secretaire',
    CHEFMENTION = 'ChefMention'
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