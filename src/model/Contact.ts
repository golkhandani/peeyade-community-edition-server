import { ContactType } from "@enum/ContactType";






export class Contact {
    type: ContactType;
    iconURL: string;
    url: string;
    verified: boolean;
    constructor(data: Partial<Contact>) {
        if (data) {
            this.iconURL = "https://peeyade.com" + data.type + ".jpeg"
            return Object.assign(this, data);
        }
    }
}
