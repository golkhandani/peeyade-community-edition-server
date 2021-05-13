import { IsBoolean, IsDefined, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform, TransformFnParams, Type } from "class-transformer";
import { toInt, toLimit, toSkip } from "@common/transformer/to-int.transformer";
import { PivotType } from "@enum/PivotType";
import { toBoolean } from "@common/transformer/to-boolean.transformer";
import { PivotOutput } from "../enum/pivot-output.enum";
import { DPI } from "@model/Media";


export class FindAllPivotQuery {
    @IsDefined()
    @IsEnum(PivotType)
    type: PivotType;

    @IsOptional()
    @IsEnum(PivotOutput)
    output: PivotOutput = PivotOutput.summary;

    @IsOptional()
    @IsNumber()
    @Transform(toSkip)
    skip: number = 0;

    @IsOptional()
    @IsNumber()
    @Transform(toLimit)
    limit: number = 10;
}