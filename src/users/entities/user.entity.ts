import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    user_id?: string;

    @Column({ type: "varchar", length: 255 })
    username?: string;

    @Column({ type: "varchar", length: 255 })
    password?: string;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    registration_date?: Date;
}
