




export class TextContent {
    text: string;
    constructor(data: TextContent) {
        if (data) {
            return Object.assign(this, data);
        }
    }
}
