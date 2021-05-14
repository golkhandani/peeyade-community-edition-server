import { PivotType } from "@enum/PivotType";
import { Exclude, Expose, Type } from "class-transformer";
import { IsDefined, ValidateNested } from "class-validator";
import { ObjectId } from "mongodb";
import { Address } from "@model/Address";
import { Attribute } from "@model/Attribute";
import { Contact } from "@model/Contact";
import { Content } from "@model/Content";
import { ContentWriter } from "@model/ContentWriter";
import { Media } from "@model/Media";
import { MetaTag } from "@model/MetaTag";
import { Rate } from "@model/Rate";
import { Status } from "@model/Status";
import { Tag } from "@model/Tag";

// ! createIndex( { "$**": "text" } )

@Exclude()
export class Pivot {
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

  @Expose()
  slug: string; //! index

  @Expose()
  description: string;

  @Expose()
  @Type(() => Media)
  media: Media[];

  @Expose()
  content: Content[];

  @Expose()
  @Type(() => Tag)
  tags: Tag[]; //! index

  @Expose()
  metaTags: MetaTag[];

  @Expose()
  note?: string;



  // Place
  @Expose()
  contacts: Contact[];

  @Expose()
  rates: Rate[];

  @Expose()
  @Type(() => ContentWriter)
  @ValidateNested()
  contentWriter: ContentWriter;

  @Expose()
  discoverer?: ContentWriter;

  @Expose()
  address: Address;

  @Expose()
  attributes: Attribute[];

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

  updatedAt: Date;

  deletedAt: Date;

  __v: number;



  @Expose()
  public isLiked: boolean = false;

  constructor(data: Pivot) {
    if (data) {
      return Object.assign(this, data);
    }
    return this;
  }

};
