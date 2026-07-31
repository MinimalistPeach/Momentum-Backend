import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("plans")
export class Plan {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({ type: "varchar", length: 255 })
    name?: string;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    created_at?: Date;

    @Column({ type: "boolean", default: () => false })
    is_completed?: boolean;

    @Column({ type: "varchar", length: 255 })
    description?: string;
}
