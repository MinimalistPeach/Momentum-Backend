import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Plan } from "./entity/plan.entity";
import { In, Repository } from "typeorm";
import { UserPlan } from "./entity/user-plan.entity";
import { CreatePlanDto } from "./dto/create-plan.dto";
import { JwtService } from "@nestjs/jwt";
import { TokenHelper } from "src/helpers/token.helper";
import { IncomingHttpHeaders } from "http";
import { JwtPayload } from 'jsonwebtoken';
import { ListPlanDto } from "./dto/list-plan.dto";

@Injectable()
export class PlanService {
    constructor(
        @InjectRepository(Plan) private readonly planRepository: Repository<Plan>,
        @InjectRepository(UserPlan) private readonly userPlanRepository: Repository<UserPlan>,
        private readonly jwtService: JwtService) { }

    async create(createPlanDto: CreatePlanDto, header: IncomingHttpHeaders): Promise<HttpStatus> {

        const token = TokenHelper.extractTokenFromHeader(header);

        var plan = new Plan();
        plan.name = createPlanDto.title;
        plan.description = createPlanDto.description;
        plan = await this.planRepository.save(plan);


        const userPlan = new UserPlan();
        userPlan.plan_id = plan.id;

        const jwtPayload: JwtPayload = this.jwtService.decode(token!);
        if (jwtPayload.sub) {
            userPlan.user_id = jwtPayload.sub;
        }

        await this.userPlanRepository.save(userPlan);
        return HttpStatus.OK;
    }

    async getAllUserPlans(header: IncomingHttpHeaders): Promise<ListPlanDto[]> {
        const token = TokenHelper.extractTokenFromHeader(header);
        const jwtPayload: JwtPayload = this.jwtService.decode(token!);
        var planList: ListPlanDto[] = [];
        if (jwtPayload.sub) {
            const planIds = (await this.userPlanRepository.findBy({ user_id: jwtPayload.sub! })).map((userPlan) => { return userPlan.plan_id });
            const planListEntities = await this.planRepository.find({
                where: {
                    id: In(planIds)
                }
            });

            planListEntities.map((plan) => {
                planList.push({ planId: plan.id!, description: plan.description!, title: plan.name!, friendIds: [] });
            });
        }
        return planList;
    }

}