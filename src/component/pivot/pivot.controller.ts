import { UserInReq, UserInRequest } from '@common/decorator/user-in-req.decorator';
import { AuthenticationGuard } from '@common/guard/authentication.guard';
import { NotFoundInterceptor } from '@common/interceptor/not-found.interceptor';
import { ParseObjectIdPipe } from '@common/pipe/parse-objectId.pipe';
import { GrantedUser } from '@common/type/granted-user.type';
import { PivotService } from '@component/pivot/pivot.service';
import { FindOnePivotResponse } from '@component/pivot/response/find-one-pivot.response';
import { MediaType } from '@enum/MediaType';
import { Media } from '@model/Media';
import { Controller, Get, HttpCode, HttpStatus, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';
import { ObjectId } from 'mongodb';

import { FindAllPivotQuery } from './request/find-all-pivot.request';


@Controller(PivotController.path)
export class PivotController {
    public static path = "pivots";
    constructor(
        private readonly pivotService: PivotService
    ) { }

    @Get("")
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthenticationGuard)
    @UseInterceptors(NotFoundInterceptor)
    async findAll(
        @Query() findAllPivotQuery: FindAllPivotQuery,
        @UserInReq() user: UserInRequest,
    ) {
        return this.pivotService.findAll(user, findAllPivotQuery);
    }


    @Get(":pivotId")
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(NotFoundInterceptor)
    async findOneById(
        @UserInReq() grantedUser: GrantedUser,
        @Param('pivotId', ParseObjectIdPipe) pivotId: ObjectId
    ): Promise<FindOnePivotResponse> {
        return await this.pivotService.findOneById(pivotId);
    }


}