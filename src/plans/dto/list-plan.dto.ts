import { ApiProperty } from "@nestjs/swagger";
import { BasePlanDto } from "./base-plan.dto";

export class ListPlanDto extends BasePlanDto {

    @ApiProperty()
    planId: string;

}