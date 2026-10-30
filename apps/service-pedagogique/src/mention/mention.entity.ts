import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, OneToMany } from "typeorm";
import { etablissement } from "../etablissement/etablissement.entity";
import { parcours } from "../parcours/parcours.entity";
import type { Relation } from "typeorm";



@Entity('mention')
export class mention{
@PrimaryGeneratedColumn({name: 'idmention'})
idmention: string ;

@Column({name : 'codemention' , unique :true})
codemention: string;

@Column({name : 'codeChef' , unique: true})
codechef: string;

@ManyToMany(() => etablissement ,(etablissement) => etablissement.mention)

@JoinColumn({name : 'idetablissement' , referencedColumnName: 'idetablissement'})
etablissement: etablissement;

@OneToMany(() => parcours, (parcours) => parcours.mention)
parcours: Relation<parcours>[];
}