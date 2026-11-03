import { Entity , PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import { Evaluation } from '../evaluation/evaluation.entity';
import { Seance } from '../seance/seance.entity';

@Entity('session')
export class session{
    @PrimaryGeneratedColumn({name : 'idsession'})
    idsession: number;

    @Column({name: 'numsession' , unique: true})
    numsession: string;

    @Column({name: 'libelesession'})
    libelesession: string;

    @Column({name: 'datedebutsession', type: 'date'})
    datedebutsession : Date;

    @Column({name : 'datefinsession', type: Date})
    datefinsession: Date;

    @OneToMany(() => Evaluation,(Evaluation)=>Evaluation.session)
    Evaluation: Relation<Evaluation>[]

    @OneToMany(() => Seance, (Seance)=>Seance.session)
    Seance : Relation<Seance>[]
}