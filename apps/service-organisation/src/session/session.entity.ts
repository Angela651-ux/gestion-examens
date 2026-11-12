import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from 'typeorm';

import type { Relation } from 'typeorm';
import { Evaluation } from '../evaluation/evaluation.entity';
import { Seance } from '../seance/seance.entity';

@Entity('session')
export class session {

    @PrimaryGeneratedColumn({ name: 'idsession' })
    idsession: number;

    @Column({ name: 'numsession', unique: true })
    numsession: string;

    @Column({ name: 'libelesession' })
    libelesession: string;

    @Column({ name: 'typesession' })
    typesession: string;

    @Column({ name: 'datedebutsession', type: 'date' })
    datedebutsession: Date;

    @Column({ name: 'datefinsession', type: 'date' })
    datefinsession: Date;

    @Column({ name: 'statutsession' })
    statutsession: string;

    @Column({ name: 'annersession' })
    annersession: string;

    @OneToMany(() => Evaluation, evaluation => evaluation.session)
    Evaluation: Relation<Evaluation[]>;

    @OneToMany(() => Seance, seance => seance.session)
    Seance: Relation<Seance[]>;
}