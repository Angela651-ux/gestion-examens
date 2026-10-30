import{IsNotEmpty , IsEnum , IsString, IsInt, Min} from 'class-validator'

import { Type } from 'class-transformer';
import { PrimaryGeneratedColumn } from 'typeorm';

export enum statuUE{
    ACTIF = 'Actif',
    INACTIF = 'Inactif',
}

export enum semestreUE{
    S1 = 'S1',
    S2 = 'S2',
    S3 = 'S3',
    S4 = 'S4',
    S5 = 'S5',
    S6 = 'S6',
    S7 = 'S7',
    S8 = 'S8',
    S9 = 'S9',
    S10 = 'S10',
}


export class ueDTO{
    @PrimaryGeneratedColumn()
    idue: number;
    
    @IsNotEmpty()
    @IsString()
    codeue: string;

    @IsNotEmpty()
    @IsString()
    libeleue: string;

    @IsEnum(statuUE)
    statueue: statuUE;

    @IsEnum(semestreUE)
    semestre: semestreUE;


    @Type(()=> Number)
    @IsInt()
    @Min(1)
    idparcours: number;
    
}