import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn , OneToMany} from "typeorm";

import  type  { Relation } from "typeorm";
import { parcours } from "../parcours/parcours.entity";
import { ec } from "../ec/ec.entity";

@Entity('ue')
export class ue{
    @PrimaryGeneratedColumn({name:'idue'})
    idue: number;

    @Column({name: 'codeue', unique :true})
    codeue: string;

    @Column({name: 'libeleue'})
    libeleue: string;

    @Column({name : 'statueue'})
    statueue : string;

    @Column({name: 'semestre'})
    semestre: string;

    @ManyToOne(() => parcours , (parcours)=> parcours.ue)

    @JoinColumn({name: 'idparcours' , referencedColumnName:'idparcours'})
    parcours: parcours;


    @OneToMany(() => ec, (ec)=> ec.ue)
    ec: Relation<ec>[]
}