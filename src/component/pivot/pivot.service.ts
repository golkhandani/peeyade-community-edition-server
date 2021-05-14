import { UserInRequest } from '@common/decorator/user-in-req.decorator';
import { PivotRepository } from '@component/pivot/pivot.repository';
import { Media } from '@model/Media';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { PivotOutput } from './enum/pivot-output.enum';
import { Pivot } from './model/pivot';

import { FindAllPivotQuery } from './request/find-all-pivot.request';
import { FindAllPivotResponse } from './response/find-all-pivot.response';

@Injectable()
export class PivotService {
  constructor(
    private readonly postRepository: PivotRepository
  ) { }

  /**
   * if you want to change value to a class and validate its value 
   * uncomment below line
   * personally I prefer in code transformation
   * is much more flexible
   */
  // @TransformAndValidate(FindAllPivotResponse)
  async findAll(user: UserInRequest, findAllPivotQuery: FindAllPivotQuery)
    : Promise<FindAllPivotResponse[]> {
    // * To confirm model and transform it to needed output
    const pivots = await this.postRepository.findAll(user._id, findAllPivotQuery);
    if (findAllPivotQuery.output == PivotOutput.summary) {
      const result = plainToClass(FindAllPivotResponse, pivots);
      return result;
    } else {
      const result = plainToClass(FindAllPivotResponse, pivots,
        {
          groups: [PivotOutput.full]
        });
      return result;
    }

  }

  async findOneById(id: ObjectId): Promise<any> {
    return await this.postRepository.findOneById(id);
  }

}