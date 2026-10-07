import { Entity , PrimaryGeneratedColumn , Column } from 'typeorm';

@Entity('utilisateur')
export class Utilisateur {
    @PrimaryGeneratedColumn()
    idutilisateur : number;

    @Column({ unique : true })
    mailutilisateur : string ;

    @Column()
    roleutilisateur : string ;

    @Column()
    motdepass : string ;

    @Column()
    nomutilisateur: string;

    @Column()
    prenomutilisateur: string;

    @Column()
    telutilisateur: string;

    @Column()
    datenaissutilisateur: string;


}