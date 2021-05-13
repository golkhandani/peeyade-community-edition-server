import { PivotOutput } from "@component/pivot/enum/pivot-output.enum";
import { Exclude, Expose } from "class-transformer";
import { MongoLocation } from "./MongoLocation";





@Exclude()
export class Address {
    @Expose()
    location: MongoLocation;

    @Expose({ groups: [PivotOutput.full] })
    city: string;

    @Expose({ groups: [PivotOutput.full] })
    state: string;

    @Expose({ groups: [PivotOutput.full] })
    country: string;

    @Expose({ groups: [PivotOutput.full] })
    street: string;

    @Expose()
    neighborhood: string;

    @Expose({ groups: [PivotOutput.full] })
    detail?: string;
    constructor(data: Address) {
        if (data) {
            return Object.assign(this, data);
        }
    }
}
