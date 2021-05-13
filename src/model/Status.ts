import { StatusType } from "@enum/StatusType";






export class Status {
    type: StatusType;
    date: Date;
    constructor(data: Status) {
        if (data) {
            return Object.assign(this, data);
        }
    }
}
