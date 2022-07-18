import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pair } from 'src/schemas/pair.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Pair.name)
    private readonly pairModel: Model<Pair>,
  ) {}

  async getPairs(): Promise<Pair[]> {
    const pairsData = await this.pairModel.find();
    if (!pairsData || pairsData.length == 0) {
      throw new NotFoundException('페어가 존재하지 않습니다.');
    }
    return pairsData;
  }
}
