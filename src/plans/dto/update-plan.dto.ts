import { ApiProperty } from "@nestjs/swagger";
import { BasePlanDto } from "./base-plan.dto";

export class UpdatePlanDto extends BasePlanDto {
    @ApiProperty()
    planId: string;
}