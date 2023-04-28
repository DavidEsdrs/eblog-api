import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("refresh_tokens")
export class RefreshToken {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ name: "token", type: "varchar" })
    token: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({ referencedColumnName: "id", name: "issuer" })
    issuer: User;
}