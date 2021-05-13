import * as Mongo from 'mongodb';
import { PipeTransform, Injectable, ArgumentMetadata, NotFoundException } from '@nestjs/common';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, Mongo.ObjectId> {
    transform(value: string, metadata: ArgumentMetadata): Mongo.ObjectId {
        if (!Mongo.ObjectId.isValid(value)) {
            throw new NotFoundException();
        }
        return new Mongo.ObjectId(value);
    }
}