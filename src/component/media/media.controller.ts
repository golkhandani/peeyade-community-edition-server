import { Controller, Get, Query, Res } from '@nestjs/common';
import * as sharp from 'sharp';
import * as path from 'path';
import { Response } from 'express';
import * as fs from "fs";
import { IsBoolean, IsDefined, IsEmail, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { FitEnum } from 'sharp';
import { Transform } from 'class-transformer';
import { toInt } from '@common/transformer/to-int.transformer';

const getColors = require('image-pal-sharp/lib/rgb');



export class ImageOption {
  @IsDefined()
  @IsNumber()
  @Transform(toInt)
  width: number;
  @IsDefined()
  @IsNumber()
  @Transform(toInt)
  height: number;
  @IsOptional()
  @IsString()
  fit: keyof sharp.FitEnum;
  // @IsString()
  // crop: string;
  // @IsNumber()
  // density: number;
  // @IsString()
  // type: string;
  // @IsBoolean()
  // progressive: boolean;
  // @IsNumber()
  // quality: number;

  @IsString()
  position: string;

  @IsString()
  name: string;
}


@Controller('media')
export class MediaController {
  constructor() { }

  @Get()
  getRequestedMedia(
    @Res() res: Response,
    @Query() imageOption: ImageOption,
  ) {

    console.log(imageOption);


    const filePath: string = path.join(__dirname, "../../../media", imageOption.name);
    console.log(filePath);

    fs.existsSync(filePath);
    const roundedCorners = Buffer.from(
      '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
    );
    const file = sharp(filePath)
      .resize({
        width: imageOption.width,
        height: imageOption.height,
        fit: imageOption.fit || sharp.fit.cover,
        // position: sharp.strategy.entropy
        position: imageOption.position
      })
      .toBuffer()
      .then(buffer => {
        getColors({ srcBuffer: buffer }, (err, colors) => {
          if (err) return void console.error('oops!', err.stack || err);

          colors.forEach(color => {
            console.log(color.rgb); // [ 100, 100, 100 ]
            console.log(color.alpha); // 255
            console.log(color.hex); // #abc123
            // below props only available if using `hsluv` version
            // console.log(color.hsluv); // [ 1, 50, 100 ]
          });
        });
      })
    //   .stats()
    //   .then((stats) => {
    //     console.log(stats);
    //   })
    // // .png().pipe(res);
  }
}