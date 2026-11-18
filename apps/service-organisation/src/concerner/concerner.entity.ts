import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import type { Relation } from "typeorm";
import { Evaluation } from "../evaluation/evaluation.entity";

@Entity('concerner')
export class concerner{
    
    @PrimaryColumn({name : 'idec'})
    idec: number;

    @PrimaryColumn({name: 'idevaluation'})
    idevaluation: number;

    @ManyToOne(() => Evaluation, Evaluation => Evaluation.concerner)
    @JoinColumn({name : 'idevaluation' , referencedColumnName: 'idevaluation'})
    Evaluation:Relation<Evaluation>;
}