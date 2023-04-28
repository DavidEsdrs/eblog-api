import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany } from "typeorm"
import { Role } from "./Role";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ name: "email", type: "varchar" })
    email: string;
    
    @Column({ name: "password", type: "varchar" })
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(type => Role, role => role.user, { eager: true })
    roles: Role[];
}