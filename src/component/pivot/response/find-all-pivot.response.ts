import { PivotType } from "@enum/PivotType";
import { Attribute } from "@model/Attribute";
import { Contact } from "@model/Contact";
import { Content } from "@model/Content";
import { ContentWriter } from "@model/ContentWriter";
import { Media, DPI } from "@model/Media";
import { MetaTag } from "@model/MetaTag";
import { Rate } from "@model/Rate";
import { Status } from "@model/Status";
import { Tag } from "@model/Tag";
import { classToPlain, Exclude, Expose, plainToClass, Transform, Type } from "class-transformer";
import { IsDefined, MinLength } from "class-validator";
import { Address } from "@model/Address";
import { ObjectId } from "mongodb";
import { PivotOutput } from "@component/pivot/enum/pivot-output.enum";
import { toMedia } from "@common/transformer/to-media.transformer";


@Exclude()
export class FindAllPivotResponse {
  @Expose()
  @Type(() => String)
  @IsDefined()
  _id: ObjectId;

  @Expose()
  type: PivotType; //! index

  @Expose()
  status: Status; //! index

  @Expose()
  title: string;

  @Expose()
  subtitle: string;

  @Expose({ groups: [PivotOutput.full] })
  slug?: string; //! index

  @Expose({ groups: [PivotOutput.full] })
  description?: string;

  @Expose()
  @Transform(toMedia)
  @Type(() => Media)
  media: Media[];

  @Expose({ groups: [PivotOutput.full] })
  content?: Content[];

  @Expose()
  @Type(() => Tag)
  tags: Tag[]; //! index

  @Expose({ groups: [PivotOutput.full] })
  metaTags?: MetaTag[];

  @Expose({ groups: [PivotOutput.full] })
  note?: string;



  // Place
  @Expose({ groups: [PivotOutput.full] })
  contacts?: Contact[];

  @Expose()
  rates: Rate[];

  @Expose()
  @Type(() => ContentWriter)
  contentWriter: ContentWriter;

  @Expose()
  discoverer?: ContentWriter;

  @Expose()
  @Type(() => Address)
  address: Address;

  @Expose({ groups: [PivotOutput.full] })
  attributes?: Attribute[];

  @Expose()
  likeCount: number;

  @Expose()
  saveCount: number;

  @Expose()
  shareCount: number;

  @Expose()
  viewCount: number;

  @Expose()
  createdAt: Date;

  @Expose()
  public isLiked: boolean = false;

}