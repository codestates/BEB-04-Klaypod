import { Controller, Get, UseInterceptors, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
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
  @ApiOperation({ summary: 'pair 정렬' })
  @Get('yield')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getPairs(@Query() sortQuery): Promise<Object> {
    const { filter, sort, cursor } = sortQuery;
    return this.dashboardService.sortAndFilterPair(sort, cursor, filter);
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
  @Get('yield/search')
  async search(@Query() searchQuery): Promise<Object> {
    const { keyword, cursor, sort } = searchQuery;
    return this.dashboardService.searchPair(keyword, cursor, sort);
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...🥲',
  })
  @ApiResponse({
    status: 200,
    description: 'Success !!!😆',
  })
  @ApiOperation({ summary: 'pair 정렬' })
  @Get('defi')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getProjects(): Promise<Object> {
    return this.dashboardService.sortProject();
  }
}
