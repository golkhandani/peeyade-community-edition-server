import { TransformAndValidate } from '@common/helper/transform-and-validate.helper';
import { Pivot } from '@component/pivot/model/pivot';
import { FindAllPivotQuery } from '@component/pivot/request/find-all-pivot.request';
import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { InjectCollection } from 'nest-mongodb';
import { PivotOutput } from './enum/pivot-output.enum';

@Injectable()
export class PivotRepository {
    constructor(
        @InjectCollection(Pivot.name) private readonly pivotCollection: Collection<Pivot>,
    ) { }


    // find all pivots and attach user like to them
    async findAll(userId: ObjectId, findAllPivotQuery: FindAllPivotQuery): Promise<Pivot[]> {
        const result = await this.pivotCollection.aggregate([
            {
                $match: {
                    type: findAllPivotQuery.type,
                    deletedAt: { $eq: null }
                },
            },
            {
                $lookup: {
                    from: "PivotLikeAndUsers",
                    let: { pivot: "$_id", user: userId },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$_id", "$$pivot"] },
                                        { $in: ["$$user", "$users"] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: { pivot: 1 }
                        }
                    ],
                    as: "isLiked"
                }
            },
            {
                $limit: findAllPivotQuery.limit
            },
            {
                $skip: findAllPivotQuery.skip
            },
            {
                $project: {
                    _id: 1,
                    type: 1,
                    status: 1,
                    title: 1,
                    subtitle: 1,
                    slug: 1,
                    description: 1,
                    media:
                        findAllPivotQuery.output == PivotOutput.summary
                            ? [{ $arrayElemAt: ["$media", 0] }]
                            : 1,
                    content: 1,
                    tags: 1,
                    metaTags: 1,
                    contacts: 1,
                    note: 1,
                    rates: 1,
                    contentWriter: 1,
                    discoverer: 1,
                    address: 1,
                    attributes: 1,
                    likeCount: 1,
                    saveCount: 1,
                    shareCount: 1,
                    viewCount: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    isLiked: {
                        $cond: {
                            if: { $eq: [{ $size: "$isLiked" }, 1] },
                            then: true,
                            else: false
                        }
                    },
                }
            }
        ]).toArray();
        return result;
    }


    @TransformAndValidate(Pivot)
    async findOneById(id: ObjectId): Promise<Pivot> {
        const result = await this.pivotCollection.aggregate([
            {
                $match: {
                    _id: id,
                    deletedAt: { $eq: null }
                },
            }
        ]).toArray();
        return result[0];
    }
}