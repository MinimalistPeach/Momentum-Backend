import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanService } from './plan.service';

@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

 
}
