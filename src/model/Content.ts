import { ContentType } from "@enum/ContentType";
import { Media } from "./Media";
import { TextContent } from "./TextContent";
import { Pivot } from "@component/pivot/model/pivot";






export class Content {
    type: ContentType;
    data: Pivot | Media | TextContent;
    constructor(data: Content) {
        if (data) {
            return Object.assign(this, data);
        }
    }
}
