import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

export type Roles = "root" | "editor" | "author" | "reader";

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ name: "type", type: "enum", enum: ["root", "editor", "author", "reader"] })
    type: Roles;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(type => User, user => user.roles)
    @JoinColumn({
        name: "user",
        referencedColumnName: "id"
    })
    user: User;
}