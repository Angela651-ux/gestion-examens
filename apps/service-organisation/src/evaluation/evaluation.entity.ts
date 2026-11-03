import { Entity , PrimaryGeneratedColumn , Column , JoinColumn, ManyToOne } from  "typeorm";
import { session } from "../session/session.entity";

@Entity('evaluation')
export class Evaluation{
    @PrimaryGeneratedColumn({name:'idevaluation'})
    idevaluation: number;

    @Column({name: 'codeevaluation' , unique: true})
    codeevaluation : string;

    @Column({name: 'typeepreuve'})
    typeepreuve: string;

    @Column({name: 'statutevaluation'})
    statutevaluation: string;

    @ManyToOne(() => session, (session)=> session.Evaluation)

    @JoinColumn({name: 'idsession' , referencedColumnName: 'idsession'})
    session: session;
    
}