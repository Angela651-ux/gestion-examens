import { Entity , PrimaryGeneratedColumn , Column } from 'typeorm';

@Entity('utilisateur')
export class Utilisateur {
    @PrimaryGeneratedColumn()
    idutilisateur : number;

    @Column({ name :'numutilisateur' ,unique: true})
    numutilisateur: string;

    @Column({name:'emailpersonnel', unique : true })
    emailpersonnel : string ;

    @Column()
    rolepersonnel : string ;


    @Column({name:'nom'})
    nom: string;

    @Column({name:'prenom'})
    prenom: string;

    @Column({name: 'datenaiss'})
    datenaiss: string;

    @Column({name: 'idetablissement', type: 'integer'})
    idetablissement: number;

     @Column({name:'motdepass', type: 'varchar', length: 255, select: false })
  motdepass: string;


}