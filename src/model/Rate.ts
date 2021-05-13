




export class Rate {
    title: string;
    iconURL: string;
    colorHex: string;
    base: number;
    value: number;
    constructor(data: Rate) {
        if (data) {
            return Object.assign(this, data);
        }
    }
}
