import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity("posts")
export class Post {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ name: "title", type: "varchar", length: "100" })
    title: string;

    @Column({ name: "summary", type: "varchar", length: "255" })
    summary: string;

    @Column({ name: "content", type: "longtext" })
    content: string;

    @Column({ name: "featured_image", type: "varchar", length: 30 })
    featured_image: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({ referencedColumnName: "id", name: "creator" })
    creator: User;
}