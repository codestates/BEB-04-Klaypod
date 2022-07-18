import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { Pair } from 'src/schemas/pair.schema';
import { Project } from 'src/schemas/project.schema';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseInterceptors(new SuccessInterceptor())
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getPairs(): Promise<Pair[]> {
    return this.dashboardService.getPairs();
  }

  @Get('/project')
  async getProjects(): Promise<Project[]> {
    return this.dashboardService.getProjects();
  }
}
