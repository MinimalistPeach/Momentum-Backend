import { ApiProperty } from "@nestjs/swagger";

export class DeletePlanDto {
    @ApiProperty()
    planId: string;
}