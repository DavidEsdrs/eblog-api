import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ name: "type", type: "enum", enum: ["root", "editor", "author", "reader"] })
    type: "root" | "editor" | "author" | "reader";

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(type => User, user => user.roles, { nullable: false })
    @JoinColumn({
        name: "user",
        referencedColumnName: "id"
    })
    user: User;
}