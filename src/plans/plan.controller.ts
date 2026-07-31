import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { PlanService } from './plan.service';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { CreatePlanDto } from './dto/create-plan.dto';

@Controller('plans')
export class PlanController {
    constructor(private readonly planService: PlanService) { }
    
    @HttpCode(HttpStatus.OK)
    @Post('')
    register(@Body() createPlanDto: CreatePlanDto, @Request() req: any) {
        return this.planService.create(createPlanDto, req.headers);
    }

    @HttpCode(HttpStatus.OK)
    @Get('/all-by-user')
    getAllByUser(@Request() req: any) {
        return this.planService.getAllUserPlans(req.headers);
    }


}
