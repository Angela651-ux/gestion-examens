
import {
  IsNotEmpty,
  IsEnum,
  IsString,
  IsDateString
} from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export enum TypeSession {
  NORMALE = 'Normale',
  RATTRAPAGE = 'Rattrapage',
}

export enum statutSession {
  En_cours = 'En cours',
  A_venir = 'A venir',
  Effectuer = 'Effectuée'
}

export class sessionDTO {

  @PrimaryGeneratedColumn()
  idsession: number;
  
  @IsNotEmpty()
  @IsString()
  numsession: string;

  @IsNotEmpty()
  @IsString()
  libelesession: string;

  @IsNotEmpty()
  @IsEnum(TypeSession)
  typesession: TypeSession;

  @IsNotEmpty()
  @IsString()
  annersession: string;

  @IsNotEmpty()
  @IsDateString()
  datedebutsession: Date;

  @IsNotEmpty()
  @IsDateString()
  datefinsession: Date;

  @IsNotEmpty()
  @IsEnum(statutSession)
  statutsession: statutSession;
}
