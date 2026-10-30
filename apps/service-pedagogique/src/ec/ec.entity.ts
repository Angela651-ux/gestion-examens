import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,} from "typeorm";
import  type{ Relation } from "typeorm";

import { ue } from "../ue/ue.entity";

@Entity('ec')
export class ec{
    @PrimaryGeneratedColumn({name: 'idec'})
    idec: number;

    @Column({name: 'numec' , unique : true})
    numec: string;

    @Column({name : 'codeenseignant' , unique: true})
    codeenseignant: string;

    @Column({name : 'nomec'})
    nomec: string;

    @Column({name: 'credit'})
    credit : number;

    @ManyToOne(() => ue ,(ue) => ue.ec)

    @JoinColumn({name : 'codeue' , referencedColumnName: 'codeue'})
    ue: Relation<ue>;
}