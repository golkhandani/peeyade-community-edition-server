import { ContactType } from "@enum/ContactType";






export class Contact {
    type: ContactType;
    iconURL: string;
    url: string;
    verified: boolean;
    constructor(data: Contact) {
        if (data) {
            return Object.assign(this, data);
        }
    }
}
