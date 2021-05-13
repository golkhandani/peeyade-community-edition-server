
export class Attribute {
    title: string;
    subtitle: string;
    description: string;
    iconURL: string;
    isEnable: boolean;
    constructor(data: Attribute) {
        if (data) {
            return Object.assign(this, data);
        }
    }
}
