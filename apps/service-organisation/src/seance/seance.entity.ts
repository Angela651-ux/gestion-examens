import { Entity , PrimaryGeneratedColumn , Column , ManyToOne , JoinColumn } from "typeorm";
import { session } from "../session/session.entity";


@Entity('seance')
export class Seance{
    @PrimaryGeneratedColumn({name: 'idseance'})
    idseance: number;

    @Column ({name: 'datedebut', type: 'date'})
    datedebut: Date;
    
    @Column({name: 'heuredebut' , type: 'time'})
    heuredebut: string;

    @Column({name: 'heurefin' , type: 'time'})
    heurefin: string;

    @ManyToOne(() =>session, (session)=> session.Seance)

    @JoinColumn({name:'idsession' , referencedColumnName: 'idsession'})
    session: session;
}