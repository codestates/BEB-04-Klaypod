import { Injectable } from '@nestjs/common';
import { DashboardRepository } from './dashboard.repository';

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  async sortAndFilterPair(sort: string, cursor: number, filter: string): Promise<Object> {
    return await this.dashboardRepository.sortAndFilterParir(sort, cursor, filter);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async searchPair(keyword: string, cursor: number, sort: string): Promise<Object> {
    return await this.dashboardRepository.searchPair(keyword, cursor, sort);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async sortProject(): Promise<Object> {
    return await this.dashboardRepository.sortProject();
  }
}
