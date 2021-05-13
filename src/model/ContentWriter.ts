import { Exclude, Expose, Type } from "class-transformer";
import { IsDefined } from "class-validator";
import { ObjectId } from "mongodb";
import { Media } from "./Media";





@Exclude()
export class ContentWriter {
    @Expose()
    @Type(() => String)
    _id: ObjectId;

    @Expose()
    name: string;

    @Expose()
    avatar?: Media;

    constructor(data: ContentWriter) {
        if (data) {
            return Object.assign(this, data);
        }
    }
}
