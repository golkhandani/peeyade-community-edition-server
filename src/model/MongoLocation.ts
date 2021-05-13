




export class MongoLocation {
    type: "Point";
    coordinate: [number, number];
    constructor(data: MongoLocation) {
        if (data) {
            data.type = "Point";
            return Object.assign(this, data);
        }
    }
}
