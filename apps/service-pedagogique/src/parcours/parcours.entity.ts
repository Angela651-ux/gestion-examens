import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { mention } from "../mention/mention.entity";
import { ue } from "../ue/ue.entity";
import type { Relation } from "typeorm";

@Entity('parcours')
export class parcours{
@PrimaryGeneratedColumn({name: 'idparcours'})
idparcours: number;

@Column({name : 'codeparcours' , unique :true})
codeparcours: string;

@Column({name : 'libeleparcours'})
libeleparcours: string;

@Column({name : 'niveau'})
niveau: string;

@ManyToOne(() => mention, (mention) => mention.parcours)
@JoinColumn({
    name: 'idmention',
    referencedColumnName: 'idmention'
})
mention: Relation<mention>;


@OneToMany(() => ue, (ue) => ue.parcours)
ue :Relation<ue>[];
}