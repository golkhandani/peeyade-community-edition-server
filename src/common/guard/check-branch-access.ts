import { ForbiddenException } from "@nestjs/common";
import { ObjectId } from "mongodb";

type KeysOfType<T, TProp> = { [P in keyof T]: T[P] extends TProp? P : never }[keyof T];

export function checkPlaceAccess<T>(grantedPlacees: ObjectId[], inputIncludePlacees: T[], placeObjectIdPath?: KeysOfType<T, ObjectId>) {
    if (!grantedPlacees.some(place => inputIncludePlacees.some((inputPlace) => place.equals((placeObjectIdPath as string) ? inputPlace[(placeObjectIdPath as string)]: inputPlace)))) {
        throw new ForbiddenException();
    } else {
        return true;
    }
}