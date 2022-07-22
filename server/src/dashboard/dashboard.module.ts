import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pair, PairSchema } from 'src/schemas/pair.schema';
import { Project, ProjectSchema } from 'src/schemas/project.schema';
import { DashboardController } from './dashboard.controller';
import { DashboardRepository } from './dashboard.repository';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pair.name, schema: PairSchema },
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService, DashboardRepository],
})
export class DashboardModule {}
