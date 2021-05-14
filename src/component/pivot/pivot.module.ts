import { Module } from '@nestjs/common';
import { MongoModule } from 'nest-mongodb';
import { PivotService } from '@component/pivot/pivot.service';
import { PivotController } from '@component/pivot/pivot.controller';
import { PivotRepository } from '@component/pivot/pivot.repository';
import { Pivot } from '@component/pivot/model/pivot';

@Module({
  imports: [
    MongoModule.forFeature([
      Pivot.name
    ])
  ],
  controllers: [
    PivotController
  ],
  providers: [
    PivotService,
    PivotRepository
  ],
  exports: [
    PivotService
  ],
})
export class PivotModule { };