import {Entity , PrimaryGeneratedColumn , Column } from "typeorm";

@Entity('enseignant')
export class Enseignant{
    @PrimaryGeneratedColumn({name : 'idenseignant'})
    idenseignant: number;

    @Column({name : 'codeenseignant' , unique: true})
    codeenseignant: string;

    @Column({name: 'idutilisateur' , unique: true})
    idutilisateur: number;

    @Column({name: 'numjury' , unique: true})
    numjury : string;
}