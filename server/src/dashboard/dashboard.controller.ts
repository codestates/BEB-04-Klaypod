import { Controller, Get, UseInterceptors, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { Pair } from 'src/schemas/pair.schema';
import { Project } from 'src/schemas/project.schema';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseInterceptors(new SuccessInterceptor())
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @ApiResponse({
    status: 500,
    description: 'Server Error...🥲',
  })
  @ApiResponse({
    status: 200,
    description: 'Success !!!😆',
  })
  @ApiOperation({ summary: 'pair tvl순 정렬' })
  @Get()
  async getPairsBySortTVL(): Promise<Pair[]> {
    return this.dashboardService.getPairsBySortTVL();
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...🥲',
  })
  @ApiResponse({
    status: 200,
    description: 'Success !!!😆',
  })
  @ApiOperation({ summary: 'pair apr순 정렬' })
  @Get('/apr')
  async getPairsBySortAPR(): Promise<Pair[]> {
    return this.dashboardService.getPairsBySortAPR();
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...🥲',
  })
  @ApiResponse({
    status: 200,
    description: 'Success !!!😆',
  })
  @ApiOperation({ summary: 'project 정렬' })
  @Get('/project')
  async getProjects(): Promise<Project[]> {
    return this.dashboardService.getProjects();
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...🥲',
  })
  @ApiResponse({
    status: 200,
    description: 'Success !!!😆',
  })
  @ApiOperation({ summary: 'pair 심볼 검색' })
  @Get('search')
  async search(@Query() searchQeury) {
    const { keyword, page, sort } = searchQeury;
    return this.dashboardService.searchPair(keyword, page, sort);
  }
}
