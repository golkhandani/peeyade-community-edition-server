import { PivotType } from "@enum/PivotType";
import { Attribute } from "@model/Attribute";
import { Contact } from "@model/Contact";
import { Content } from "@model/Content";
import { ContentWriter } from "@model/ContentWriter";
import { Media } from "@model/Media";
import { MetaTag } from "@model/MetaTag";
import { Rate } from "@model/Rate";
import { Status } from "@model/Status";
import { Tag } from "@model/Tag";
import { Exclude, Expose, Type } from "class-transformer";
import { IsDefined, MinLength } from "class-validator";
import { Address } from "cluster";
import { ObjectId } from "mongodb";

export class FindOnePivotResponse {
    
    _id: ObjectId;

    type: PivotType; //! index

    status: Status; //! index

    title: string;

    subtitle: string;

    slug: string; //! index

    description: string;

    media: Media[];

    content: Content[];

    tags: Tag[]; //! index

    metaTags: MetaTag[];

    note?: string;



    // Place
    contacts: Contact[];

    rates: Rate[];

    contentWriter: ContentWriter;
    
    discoverer?: ContentWriter;

    address: Address;

    attributes: Attribute[];

    createdAt: Date;

    updatedAt: Date;

    deletedAt: Date;

    __v: number;


}