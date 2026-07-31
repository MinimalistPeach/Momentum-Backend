import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users_plans")
export class UserPlan {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({ type: "varchar"})
    user_id?: string;

    @Column({ type: "varchar" })
    plan_id?: string;
}
