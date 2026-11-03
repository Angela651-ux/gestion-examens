import { Entity , PrimaryGeneratedColumn, Column , OneToMany,} from "typeorm"
import type { Relation } from "typeorm";
import { Tables } from "../table/table.entity";



@Entity('salle')
export class Salle{
    @PrimaryGeneratedColumn({name: 'idsalle'})
    idsalle: number;

    @Column({name: 'numsalle' , unique: true})
    numsalle: string;

    @Column({name: 'localisation'})
    localisation: string;

    @OneToMany(() => Tables,(Tables)=>Tables.Salle)
    Tables: Relation<Tables>[]
    
}