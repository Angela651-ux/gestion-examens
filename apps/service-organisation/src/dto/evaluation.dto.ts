import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsEnum,
  Min,
  IsDateString
} from "class-validator";

import { Type } from "class-transformer";

export enum typeEval {
  THEORIE = 'theorie',
  PRATIQUE = 'pratique',
}

export enum statutEval {
  EN_COURS = 'En cours',
  A_VENIR = 'A venir',
  EFFECTUER = 'Effectuée'
}

export class EvaluationDTO {

  @IsNotEmpty()
  @IsString()
  libeleevaluation: string;

  @IsNotEmpty()
  @IsString()
  codeevaluation: string;

  @IsEnum(typeEval)
  typeepreuve: typeEval;

  @IsEnum(statutEval)
  statutevaluation: statutEval;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  idsession: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  idec: number;

  @IsDateString()
  dateevaluation: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  idchef: number;
}