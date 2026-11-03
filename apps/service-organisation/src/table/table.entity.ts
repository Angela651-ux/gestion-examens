import { Entity , PrimaryGeneratedColumn , Column, ManyToOne, JoinColumn} from "typeorm";
import { Salle } from "../salle/salle.entity";

@Entity('table')
export class Tables{
    @PrimaryGeneratedColumn({name:'idtables'})
    idtables: number;

    @Column({name: 'numtables' , unique :true})
    numtables: string;

    @Column({name: 'nbtable'})
    nbtable: number;

    @ManyToOne(() => Salle , (Salle)=> Salle.Tables)

    @JoinColumn({name : 'idsalle' , referencedColumnName: 'idsalle'})
    Salle: Salle;
}