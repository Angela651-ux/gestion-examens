import {Entity , PrimaryGeneratedColumn, Column , OneToOne} from 'typeorm'
import { mention } from '../mention/mention.entity';

@Entity('etablissement')
export class etablissement{
    @PrimaryGeneratedColumn({name: 'idetablissement'})
    idetablissement : number;

    @Column({name: 'codeetabliss' , unique :true})
    codeetabliss: string;

    @Column({name: 'libeleetablissement'})
    libeleetablissement: string;

    @Column({name: 'adressetablissement'})
    adressetablissement: string;

    @Column({name :'emailetablissement', unique: true})
    emailetablissement: string;

    @OneToOne(() => mention ,(mention)=> mention.etablissement)
    mention: mention[]
}
