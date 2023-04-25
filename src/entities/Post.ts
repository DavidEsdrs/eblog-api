import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity("posts")
export class Post {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ name: "content", type: "longtext" })
    content: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(type => User)
    creator: User;
}