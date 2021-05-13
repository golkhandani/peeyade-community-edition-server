import { PivotOutput } from "@component/pivot/enum/pivot-output.enum";
import { MediaType } from "@enum/MediaType";
import { Exclude, Expose, Transform } from "class-transformer";
import { ContentWriter } from "./ContentWriter";



export enum DPI {
    high = "high",
    medium = "medium",
    low = "low"
}
export const defaultDpi = DPI.medium;

@Exclude()
export class Media {
    public static dpi = DPI.medium;
    @Expose()
    type: MediaType;

    @Expose({ toClassOnly: true })
    url: string;

    @Expose()
    thumbnail?: Media;

    @Expose()
    width: number;

    @Expose()
    height: number;

    @Expose({ groups: [PivotOutput.full] })
    title?: string;

    @Expose({ groups: [PivotOutput.full] })
    description?: string;

    @Expose({ groups: [PivotOutput.full] })
    contentWriter?: ContentWriter;

    constructor(data: Partial<Media>) {
        if (data) {
            return Object.assign(this, data);
        }
    }
}
