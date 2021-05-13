import { PivotOutput } from "@component/pivot/enum/pivot-output.enum";
import { Exclude, Expose } from "class-transformer";
import { ObjectId } from "mongodb";
import { Media } from "./Media";





@Exclude()
export class Tag {
    @Expose()
    _id: ObjectId;
    @Expose()
    title: string;
    @Expose()
    subtitle: string;
    @Expose()
    description: string;
    @Expose()
    iconURL: string;
    @Expose({ groups: [PivotOutput.full] })
    media: Media[];

    constructor(data: Tag) {
        if (data) {
            return Object.assign(this, data);
        }
    }
}
