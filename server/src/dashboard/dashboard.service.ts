import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pair, PairDocument } from 'src/schemas/pair.schema';
import { Project } from 'src/schemas/project.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Pair.name)
    private readonly pairModel: Model<Pair>,
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
  ) {}

  async getPairsBySortTVL(): Promise<Pair[]> {
    const pairsData = await this.pairModel.find().populate('project_id').sort({ tvl: 'desc' });
    if (!pairsData || pairsData.length == 0) {
      throw new NotFoundException('페어가 존재하지 않습니다.');
    }
    return pairsData;
  }

  async getPairsBySortAPR(): Promise<Pair[]> {
    const pairsData = await this.pairModel.find().populate('project_id').sort({ apr: 'desc' });
    if (!pairsData || pairsData.length == 0) {
      throw new NotFoundException('페어가 존재하지 않습니다.');
    }
    return pairsData;
  }

  async getProjects(): Promise<Project[]> {
    const projectsData = await this.projectModel.find();
    if (!projectsData || projectsData.length == 0) {
      throw new NotFoundException('프로젝트가 존재하지 않습니다.');
    }
    return projectsData;
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
