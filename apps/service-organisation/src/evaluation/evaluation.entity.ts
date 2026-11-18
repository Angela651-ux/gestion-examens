import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';

import type { Relation } from 'typeorm';
import { session } from '../session/session.entity';
import { concerner } from '../concerner/concerner.entity';
import { Seance } from '../seance/seance.entity';

@Entity('evaluation')
export class Evaluation {

    @PrimaryGeneratedColumn({ name: 'idevaluation' })
    idevaluation: number;

    @Column({ name: 'codeevaluation', unique: true })
    codeevaluation: string;

    @Column({ name: 'typeepreuve' })
    typeepreuve: string;

    @Column({ name: 'statutevaluation' })
    statutevaluation: string;

    @Column({name: 'idchef', unique:true})
    idchef: number;

    @Column({name: 'dateevaluation' , type: Date})
    dateevaluation: Date;

    @ManyToOne(() => session, session => session.Evaluation)
    @JoinColumn({ name: 'idsession', referencedColumnName: 'idsession' })
    session: Relation<session>;

    @OneToMany(() => concerner, concerner => concerner.Evaluation)
    concerner: Relation<concerner>

    @OneToMany(() => Seance , Seance => Seance.Evaluation)
    Seance: Relation<Seance>

}