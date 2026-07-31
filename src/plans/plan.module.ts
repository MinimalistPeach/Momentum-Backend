import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './entity/plan.entity';
import { PlanController, } from './plan.controller';
import { PlanService } from './plan.service';
import { UserPlan } from './entity/user-plan.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Plan, UserPlan])],
  controllers: [PlanController],
  providers: [PlanService, JwtService],
  exports: [PlanService, JwtService]
})
export class PlanModule {}