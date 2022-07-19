import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pair } from 'src/schemas/pair.schema';
import { Project } from 'src/schemas/project.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Pair.name)
    private readonly pairModel: Model<Pair>,
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
  ) {}

  async sortAndFilterPair(sort: string, page: number, filter: string): Promise<Pair[]> {
    // 정렬 기준(sort)가 query string에 주어지지 않았다면 디폴트 값인 tvl 순으로 정렬한다.
    if (!sort) sort = 'tvl';

    const sortBy = {};
    sortBy[sort.toLowerCase()] = 'desc';

    if (filter) {
      const found = await this.pairModel
        .find({ isActive: true })
        .populate({
          path: 'project_id',
          match: { name: filter },
        })
        .sort(sortBy);
      return found.filter((el) => el.project_id !== null);
    }

    try {
      const sorted = await this.pairModel
        .find({ isActive: true })
        .populate('project_id')
        .sort(sortBy);
      return sorted;
    } catch (error) {
      throw error;
    }
  }

  async searchPair(keyword: string, page: number, sort: string): Promise<Pair[]> {
    // 정렬 기준(sort)가 query string에 주어지지 않았다면 디폴트 값인 tvl 순으로 정렬한다.
    if (!sort) sort = 'tvl';

    const sortBy = {};
    sortBy[sort.toLowerCase()] = -1;

    try {
      const searched = await this.pairModel
        .find({ isActive: true, pair: new RegExp(keyword, 'i') })
        .populate('project_id')
        .sort(sortBy);
      return searched;
    } catch (error) {
      throw new Error('error: searchPair in dashboard.service.ts');
    }
  }
}
