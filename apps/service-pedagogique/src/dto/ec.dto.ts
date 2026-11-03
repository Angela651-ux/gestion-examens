import { IsNotEmpty ,IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PrimaryGeneratedColumn } from 'typeorm';

export class ecDTO{
    @PrimaryGeneratedColumn()
    idec: number;

    @IsNotEmpty()
    @IsString()
    numec: string;

    @IsNotEmpty()
    @IsString()
    nomec: string;

    @IsNotEmpty()
    @IsInt()
    credit: number;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    idenseignant: number;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    idue: number;

}