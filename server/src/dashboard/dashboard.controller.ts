import { Controller, Get, UseInterceptors, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { Pair } from 'src/schemas/pair.schema';
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
  @Get()
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
  @Get('search')
  async search(@Query() searchQuery): Promise<Object> {
    const { keyword, cursor, sort } = searchQuery;
    return this.dashboardService.searchPair(keyword, cursor, sort);
  }
}
