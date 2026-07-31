import { ApiProperty } from "@nestjs/swagger";

export abstract class BasePlanDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    friendIds?: string[];
}