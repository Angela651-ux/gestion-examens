import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";

import { Salle } from "../salle/salle.entity";
import type { Relation } from "typeorm";

@Entity('table')
export class Tables {

    @PrimaryGeneratedColumn({ name: 'idtables' })
    idtables: number;

    @Column({ name: 'numtables', unique: true })
    numtables: string;

    @Column({ name: 'nbtable' })
    nbtable: number;

    @ManyToOne(() => Salle, (salle) => salle.Tables)
    @JoinColumn({
        name: 'idsalle',
        referencedColumnName: 'idsalle'
    })
    Salle: Relation<Salle>;
}