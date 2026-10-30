import {Entity , PrimaryGeneratedColumn , Column ,} from 'typeorm'

@Entity('chefmention')
export class chefmention{
    @PrimaryGeneratedColumn({name: 'idchef'})
    idchef: number ;

    @Column({name:'codechef' , unique: true})
    codechef: string;

    @Column({name: 'idutilisateur', unique: true})
    idutilisateur  : number;
}