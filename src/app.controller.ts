import { Controller } from '@nestjs/common';
import { Db } from 'mongodb';
import { InjectDb } from 'nest-mongodb';

@Controller()
export class AppController {
	constructor(
		@InjectDb() private readonly db: Db
	) { }

	// 	async organizeAllCheckIn() {
	// 		const checkIns = await this.db
	// 			.collection("game_users")
	// 			.find()
	// 			//.limit(10)
	// 			.skip(0)
	// 			.toArray();

	// 		for (let index = 0; index < checkIns.length; index++) {
	// 			const checkIn = checkIns[index];

	// 			for (let j = 0; j < checkIn.locations.length; j++) {
	// 				const location = checkIn.locations[j];


	// 				const checkInInfo = {
	// 					...(await this.db.collection("game_locations").findOne({ _id: location.location })),
	// 					checkInCount: location.n_total,
	// 					user: checkIn.in_app_id
	// 				}
	// 				delete checkInInfo._id;
	// 				checkInInfo.user = checkInInfo.user;
	// 				checkInInfo.pivot = checkInInfo.in_app_id;

	// 				try {
	// 					const inserted = await this.db.collection("PeeyadeCheckIn").insertOne(checkInInfo);
	// 					console.log(index, inserted.insertedId);
	// 				} catch (error) {
	// 					console.log("ERROR", index, checkInInfo, error);
	// 				}



	// 			}

	// 		}
	// 		return "checkIn";
	// 	}



	// 	async groupCheckInsByPivot() {
	// 		const pivotAndCheckIns = await this.db
	// 			.collection("PeeyadeCheckIn")
	// 			.aggregate([
	// 				{
	// 					'$group': {
	// 						'_id': '$pivot',
	// 						'pivot': {
	// 							'$first': '$pivot'
	// 						},
	// 						'users': {
	// 							'$push': '$user'
	// 						},
	// 						'totalPivotCheckIn': {
	// 							'$sum': '$checkInCount'
	// 						}
	// 					}
	// 				}, {
	// 					'$sort': {
	// 						'totalPivotCheckIn': -1
	// 					}
	// 				}
	// 			], { allowDiskUse: true }).toArray()




	// 		for (let index = 0; index < pivotAndCheckIns.length; index++) {
	// 			const pivotAndCheckIn = pivotAndCheckIns[index]
	// 			if (pivotAndCheckIn.pivot) {
	// 				try {
	// 					const inserted = await this.db.collection("PeeyadePivotCheckInAndUsers").insertOne(pivotAndCheckIn);
	// 					console.log(index, inserted.insertedId);
	// 				} catch (error) {
	// 					console.log("ERROR", index, pivotAndCheckIn, error);
	// 				}
	// 			}
	// 		}
	// 		return "checkIn";
	// 	}


	// 	async groupCheckInsByUser() {
	// 		const userAndCheckIns = await this.db.collection("PeeyadeCheckIn").aggregate([
	// 			{
	// 				'$group': {
	// 					'_id': '$user',
	// 					'user': {
	// 						'$first': '$user'
	// 					},
	// 					'checkIns': {
	// 						'$push': {
	// 							'totalPivotCheckIn': '$checkInCount',
	// 							'pivot': '$pivot'
	// 						}
	// 					},
	// 					'totalCheckInCount': {
	// 						'$sum': '$checkInCount'
	// 					}
	// 				}
	// 			}, {
	// 				'$sort': {
	// 					'totalCheckInCount': -1
	// 				}
	// 			}
	// 		], { allowDiskUse: true }).toArray();

	// 		for (let index = 0; index < userAndCheckIns.length; index++) {
	// 			const userAndCheckIn = userAndCheckIns[index]

	// 			if (userAndCheckIn.user) {

	// 				try {

	// 					const inserted = await this.db.collection("PeeyadeUserCheckInAndPivots").insertOne(userAndCheckIn);
	// 					console.log(index, inserted.insertedId);

	// 				} catch (error) {
	// 					console.log("ERROR", index, userAndCheckIn, error);
	// 				}
	// 				// delete pivotWithCheckIn.users;
	// 				// const inserted2 = await this.db.collection("PeeyadePivotCheckIn").insertOne(pivotWithCheckIn);

	// 			}





	// 		}
	// 		return "checkIn";
	// 	}


	// 	async createUserGameProfile() {
	// 		const agg = [
	// 			{
	// 				'$group': {
	// 					'_id': '$in_app_id',
	// 					'user': {
	// 						'$first': '$in_app_id'
	// 					},
	// 					'badges': {
	// 						'$first': '$badges'
	// 					},
	// 					'totalScore': {
	// 						'$first': '$totalScore'
	// 					},
	// 					'festivals': {
	// 						'$first': '$festivals'
	// 					}
	// 				}
	// 			}, {
	// 				'$match': {
	// 					'totalScore': {
	// 						'$gt': 0
	// 					}
	// 				}
	// 			}, {
	// 				'$project': {
	// 					'_id': 1,
	// 					'user': 1,
	// 					'badges': 1,
	// 					'totalScore': 1,
	// 					'festival': {
	// 						'$arrayElemAt': [
	// 							'$festivals', 0
	// 						]
	// 					},
	// 					'sizeOfFestival': {
	// 						'$size': '$festivals'
	// 					}
	// 				}
	// 			}, {
	// 				'$match': {
	// 					'sizeOfFestival': {
	// 						'$gt': 0
	// 					}
	// 				}
	// 			}, {
	// 				'$project': {
	// 					'_id': 1,
	// 					'user': 1,
	// 					'badges': 1,
	// 					'score': '$totalScore',
	// 					'level': '$festival.currentLevel.level',
	// 					'label': '$festival.currentLevel.title'
	// 				}
	// 			}, {
	// 				'$sort': {
	// 					'score': -1
	// 				}
	// 			}
	// 		];

	// 		const gameProfiles = await this.db.collection('game_users').aggregate(agg).toArray();
	// 		for (let index = 0; index < gameProfiles.length; index++) {
	// 			const gameProfile = gameProfiles[index]
	// 			if (gameProfile) {
	// 				for (let j = 0; j < gameProfile.badges.length; j++) {
	// 					const badge = gameProfile.badges[j];
	// 					const exists = await this.db.collection("PeeyadeGameBadge").findOne({ title: badge.name });

	// 					//	console.log("EXISTS", exists);

	// 					if (exists) {
	// 						gameProfile.badges[j] = exists;
	// 					} else {

	// 						const newBadge = {
	// 							title: badge.name,
	// 							media: [new Media({
	// 								url: badge.image.url,
	// 								height: badge.image.height,
	// 								width: badge.image.width,
	// 								type: MediaType.Image
	// 							})]
	// 						}
	// 						gameProfile.badges[j] = await (await this.db.collection("PeeyadeGameBadge").insertOne(newBadge)).ops[0];
	// 					}

	// 				}

	// 				try {
	// 					const inserted = await this.db.collection("PeeyadeUserGameProfile").insertOne(gameProfile);
	// 					console.log(index, inserted.insertedId);
	// 				} catch (error) {
	// 					console.log("ERROR", index, gameProfile, error);
	// 				}
	// 			}
	// 		}
	// 	}

	// 	async createPivotViewByUser() {
	// 		const agg = [
	// 			{
	// 				'$match': {
	// 					'view.isDone': true
	// 				}
	// 			}, {
	// 				'$group': {
	// 					'_id': '$post',
	// 					'pivot': {
	// 						'$first': '$post'
	// 					},
	// 					'viewCount': {
	// 						'$sum': '$view.count'
	// 					},
	// 					'users': {
	// 						'$push': '$user'
	// 					}
	// 				}
	// 			}
	// 		]

	// 		const pivotViews = await this.db.collection("post-interactions").aggregate(agg).toArray();

	// 		for (let index = 0; index < pivotViews.length; index++) {
	// 			const pivotView = pivotViews[index]
	// 			if (pivotView.pivot) {
	// 				try {
	// 					const inserted = await this.db.collection("PeeyadePivotViewAndUsers").insertOne(pivotView);
	// 					console.log(index, inserted.insertedId);
	// 				} catch (error) {
	// 					console.log("ERROR", index, pivotView, error);
	// 				}
	// 			}
	// 		}
	// 	}

	// 	async createPivotLikeByUser() {
	// 		const agg = [
	// 			{
	// 				'$match': {
	// 					'like.isDone': true
	// 				}
	// 			}, {
	// 				'$group': {
	// 					'_id': '$post',
	// 					'pivot': {
	// 						'$first': '$post'
	// 					},
	// 					'likeCount': {
	// 						'$sum': 1
	// 					},
	// 					'users': {
	// 						'$push': '$user'
	// 					}
	// 				}
	// 			}
	// 		]

	// 		const pivotLikes = await this.db.collection("post-interactions").aggregate(agg).toArray();

	// 		for (let index = 0; index < pivotLikes.length; index++) {
	// 			const pivotLike = pivotLikes[index]
	// 			if (pivotLike.pivot) {
	// 				try {
	// 					const inserted = await this.db.collection("PeeyadePivotLikeAndUsers").insertOne(pivotLike);
	// 					console.log(index, inserted.insertedId);
	// 				} catch (error) {
	// 					console.log("ERROR", index, pivotLike, error);
	// 				}
	// 			}
	// 		}
	// 	}

	// 	async createPivotShareByUser() {
	// 		const agg = [
	// 			{
	// 				'$match': {
	// 					'share.isDone': true
	// 				}
	// 			}, {
	// 				'$group': {
	// 					'_id': '$post',
	// 					'pivot': {
	// 						'$first': '$post'
	// 					},
	// 					'shareCount': {
	// 						'$sum': '$share.count'
	// 					},
	// 					'users': {
	// 						'$push': '$user'
	// 					}
	// 				}
	// 			}
	// 		]

	// 		const pivotShares = await this.db.collection("post-interactions").aggregate(agg).toArray();

	// 		for (let index = 0; index < pivotShares.length; index++) {
	// 			const pivotShare = pivotShares[index]
	// 			if (pivotShare.pivot) {
	// 				try {
	// 					const inserted = await this.db.collection("PeeyadePivotShareAndUsers").insertOne(pivotShare);
	// 					console.log(index, inserted.insertedId);
	// 				} catch (error) {
	// 					console.log("ERROR", index, pivotShare, error);
	// 				}
	// 			}
	// 		}
	// 	}

	// 	async createPivotSaveByUser() {
	// 		const agg = [
	// 			{
	// 				'$match': {
	// 					'save.isDone': true
	// 				}
	// 			}, {
	// 				'$group': {
	// 					'_id': '$post',
	// 					'pivot': {
	// 						'$first': '$post'
	// 					},
	// 					'saveCount': {
	// 						'$sum': 1
	// 					},
	// 					'users': {
	// 						'$push': '$user'
	// 					}
	// 				}
	// 			}
	// 		]

	// 		const pivotSaves = await this.db.collection("post-interactions").aggregate(agg).toArray();

	// 		for (let index = 0; index < pivotSaves.length; index++) {
	// 			const pivotSave = pivotSaves[index]
	// 			if (pivotSave.pivot) {
	// 				try {
	// 					const inserted = await this.db.collection("PeeyadePivotSaveAndUsers").insertOne(pivotSave);
	// 					console.log(index, inserted.insertedId);
	// 				} catch (error) {
	// 					console.log("ERROR", index, pivotSave, error);
	// 				}
	// 			}
	// 		}
	// 	}


	// 	async createUserInterActionsAndPivots() {
	// 		const agg = [
	// 			{
	// 				'$unwind': {
	// 					'path': '$users'
	// 				}
	// 			}, {
	// 				'$group': {
	// 					'_id': '$users',
	// 					'user': {
	// 						'$first': '$users'
	// 					},
	// 					'pivots': {
	// 						'$push': '$pivot'
	// 					}
	// 				}
	// 			}
	// 		]

	// 		const pivotSaves = await this.db.collection("PeeyadePivotSaveAndUsers").aggregate(agg).toArray();

	// 		for (let index = 0; index < pivotSaves.length; index++) {
	// 			const pivotSave = pivotSaves[index]

	// 			if (pivotSave) {
	// 				try {
	// 					const inserted = await this.db.collection("PeeyadeUserSaveAndPivots").insertOne(pivotSave);
	// 					console.log(index, inserted.insertedId);
	// 				} catch (error) {
	// 					console.log("ERROR", index, pivotSave, error);
	// 				}
	// 			}
	// 		}


	// 		const pivotLikes = await this.db.collection("PeeyadePivotLikeAndUsers").aggregate(agg).toArray();
	// 		for (let index = 0; index < pivotLikes.length; index++) {
	// 			const pivotLike = pivotLikes[index]
	// 			if (pivotLike) {
	// 				try {
	// 					const inserted = await this.db.collection("PeeyadeUserLikeAndPivots").insertOne(pivotLike);
	// 					console.log(index, inserted.insertedId);
	// 				} catch (error) {
	// 					console.log("ERROR", index, pivotLike, error);
	// 				}
	// 			}
	// 		}

	// 		const pivotShares = await this.db.collection("PeeyadePivotShareAndUsers").aggregate(agg).toArray();
	// 		for (let index = 0; index < pivotShares.length; index++) {
	// 			const pivotShare = pivotShares[index]
	// 			if (pivotShare) {
	// 				try {
	// 					const inserted = await this.db.collection("PeeyadeUserShareAndPivots").insertOne(pivotShare);
	// 					console.log(index, inserted.insertedId);
	// 				} catch (error) {
	// 					console.log("ERROR", index, pivotShare, error);
	// 				}
	// 			}
	// 		}

	// 		const pivotViews = await this.db.collection("PeeyadePivotViewAndUsers").aggregate(agg).toArray();
	// 		for (let index = 0; index < pivotViews.length; index++) {
	// 			const pivotView = pivotViews[index]
	// 			if (pivotView) {
	// 				try {
	// 					const inserted = await this.db.collection("PeeyadeUserViewAndPivots").insertOne(pivotView);
	// 					console.log(index, inserted.insertedId);
	// 				} catch (error) {
	// 					console.log("ERROR", index, pivotView, error);
	// 				}
	// 			}
	// 		}


	// 	}



	// 	@Get()
	// 	async convertOldToNewPost() {

	// 		const peeyadeAuthor: ContentWriter = {
	// 			_id: new ObjectId(),
	// 			name: 'پیاده',
	// 			avatar: {
	// 				type: MediaType.Image,
	// 				height: 100,
	// 				width: 100,
	// 				url: "http://peeyadeAuthor.image.url"
	// 			}
	// 		}
	// 		const oPosts = await this.db
	// 			.collection("posts")
	// 			.find({
	// 				$or: [
	// 					{ "kind": "PLACE", },
	// 					{ "kind": "USERPLACE", }
	// 				]
	// 			})
	// 			//.limit(10)
	// 			.skip(0)
	// 			.toArray();




	// 		for (let index = 0; index < oPosts.length; index++) {
	// 			const oPost = oPosts[index];



	// 			const contacts = [];
	// 			Object.keys(oPost.contact).forEach(item => {
	// 				if (Array.isArray(oPost.contact[item])) {
	// 					oPost.contact[item].forEach(element => {
	// 						let type;
	// 						if (item == "phones") {
	// 							type = ContactType.Phone
	// 						} else if (item == "instagram") {
	// 							type = ContactType.Instagram
	// 						} else {
	// 							type = ContactType.Web
	// 						}
	// 						contacts.push(new Contact({
	// 							type: type,
	// 							iconURL: "http://icon.url",
	// 							url: element,
	// 							verified: true
	// 						}))
	// 					});
	// 				} else {
	// 					let type;
	// 					if (item == "phones") {
	// 						type = ContactType.Phone
	// 					} else if (item == "instagram") {
	// 						type = ContactType.Instagram
	// 					} else {
	// 						type = ContactType.Web
	// 					}
	// 					contacts.push(new Contact({
	// 						type: type,
	// 						iconURL: "http://contacts.url",
	// 						url: oPost.contact[item],
	// 						verified: true
	// 					}))
	// 				}
	// 			});

	// 			const rateArray = [];
	// 			oPost.rate.details.forEach(item => {
	// 				rateArray.push({
	// 					base: 5,
	// 					value: item.value,
	// 					title: rates.find(rate => {
	// 						return rate._id.$oid == item.kind.toString()
	// 					}).name,
	// 					iconURL: "http://rates.url"
	// 				})
	// 			});

	// 			const author = await this.db.collection("users").findOne({ _id: oPost.authors[0] });
	// 			const discoverer = await this.db.collection("users").findOne({ _id: oPost.discoverers[0] });;

	// 			const tags: Tag[] = [];
	// 			oPost.category.forEach(element => {
	// 				const cat = categories.find(c => {
	// 					return c._id.$oid == element.toString()
	// 				});
	// 				if (cat)
	// 					tags.push({
	// 						_id: new ObjectId(cat._id.$oid),
	// 						description: cat.name,
	// 						iconURL: "http://tags.url",
	// 						media: [{
	// 							url: cat.image?.url || "http://tags.url",
	// 							height: cat.image?.height || 0,
	// 							width: cat.image?.width || 0,
	// 							type: MediaType.Image
	// 						}],
	// 						title: cat.name,
	// 						subtitle: cat.name
	// 					})
	// 			});

	// 			const subcat = subcategories.find(c => {
	// 				return c._id.$oid == oPost.subcategory.toString()
	// 			});
	// 			if (subcat && !tags.find(item => item.title == subcat.name))
	// 				tags.push({
	// 					_id: new ObjectId(subcat._id.$oid),
	// 					description: subcat.name,
	// 					iconURL: "http://tags.url",
	// 					media: [{
	// 						url: "http://tags.url",
	// 						height: 100,
	// 						width: 100,
	// 						type: MediaType.Image
	// 					}],
	// 					title: subcat.name,
	// 					subtitle: subcat.name
	// 				});

	// 			const attributes = [];
	// 			attributes.push({
	// 				title: "سیگار",
	// 				description: "سیگار",
	// 				iconURL: "http://attributes.url",
	// 				isEnable: oPost.smoking?.exists || false,
	// 				subtitle: "سیگار"
	// 			});
	// 			attributes.push({
	// 				title: "پارکینگ",
	// 				description: "پارکینگ",
	// 				iconURL: "http://attributes.url",
	// 				isEnable: oPost.parking?.exists || false,
	// 				subtitle: "پارکینگ"
	// 			});
	// 			attributes.push({
	// 				title: "سرویس بهداشتی",
	// 				description: "سرویس بهداشتی",
	// 				iconURL: "http://attributes.url",
	// 				isEnable: oPost.wc?.exists || false,
	// 				subtitle: "سرویس بهداشتی",
	// 			});
	// 			attributes.push({
	// 				title: "دلیوری",
	// 				description: "دلیوری",
	// 				iconURL: "http://attributes.url",
	// 				isEnable: oPost.delivery?.exists || false,
	// 				subtitle: "دلیوری"
	// 			});

	// 			const metaTags = oPost.tags.custom.map(element => {
	// 				return element.title
	// 			}).concat(oPost.tags.general.map(element => {
	// 				return element.title
	// 			}));

	// 			const content = oPost.content.main.map(element => {
	// 				const c = new Content({
	// 					data: element.text,
	// 					type: element.kind == "TEXT" ? ContentType.Text : ContentType.Media,
	// 				})
	// 				return c;
	// 			}).concat(oPost.content.sub?.map(element => {
	// 				const c = new Content({
	// 					data: element.text,
	// 					type: element.kind == "TEXT" ? ContentType.Text : ContentType.Media,
	// 				})
	// 				return c
	// 			}));

	// 			const media = [];
	// 			for (let index = 0; index < oPost.media.length; index++) {
	// 				const item = oPost.media[index];

	// 				const mediaItem = await this.db.collection("post-medias").findOne({ _id: item });
	// 				const user = await this.db.collection("users").findOne({ _id: mediaItem?.producer?.user || null })

	// 				media.push({
	// 					type: mediaItem.kind == "IMAGE" ? MediaType.Image : MediaType.Video,
	// 					height: mediaItem.image?.height || 100,
	// 					width: mediaItem.image?.width || 100,
	// 					url: mediaItem.image?.url || mediaItem.video.url,
	// 					...(mediaItem.video && {
	// 						thumbnail: {
	// 							url: mediaItem.video.thumbnail.url,
	// 							type: MediaType.Image,
	// 							height: mediaItem.video.thumbnail.height,
	// 							width: mediaItem.video.thumbnail.width
	// 						}
	// 					}),
	// 					...(user != null && {
	// 						contentWriter: {
	// 							_id: user._id,
	// 							title: user.name,
	// 							...(user.image && {
	// 								avatar: {
	// 									type: MediaType.Image,
	// 									height: 100,
	// 									width: 100,
	// 									url: user.image.url
	// 								}
	// 							})
	// 						},
	// 					})

	// 				})

	// 			}




	// 			const pivot = new Pivot({
	// 				_id: oPost._id,
	// 				title: oPost.name,
	// 				subtitle: oPost.subtitle,
	// 				description: oPost.subtitle,
	// 				...(oPost.note && { note: oPost.note }),
	// 				status: new Status({
	// 					type: oPost.publish.status = "PUBLISHED" ? StatusType.Published : StatusType.Unpublished,
	// 					date: oPost.publish.date || new Date()
	// 				}),
	// 				contacts: contacts,
	// 				rates: rateArray,
	// 				type: PivotType.Place,
	// 				contentWriter: author ? new ContentWriter({
	// 					_id: author._id,
	// 					name: author.name,
	// 					...(author.image && {
	// 						avatar: {
	// 							type: MediaType.Image,
	// 							height: 100,
	// 							width: 100,
	// 							url: author.image.url
	// 						}
	// 					})
	// 				}) : peeyadeAuthor,
	// 				...(discoverer && {
	// 					discoverer: new ContentWriter({
	// 						_id: discoverer._id,
	// 						name: discoverer.name,
	// 						...(discoverer.image && {
	// 							avatar: {
	// 								type: MediaType.Image,
	// 								height: 100,
	// 								width: 100,
	// 								url: discoverer.image.url
	// 							}
	// 						})
	// 					})
	// 				}),
	// 				address: {
	// 					country: "ایران",
	// 					city: "تهران",
	// 					state: "تهران",
	// 					street: oPost.location.address,
	// 					location: oPost.location.geo,
	// 					neighborhood: (await this.db.collection("post-neighborhoods").findOne({ _id: oPost.location.neighborhood }))?.name || oPost.scope,
	// 				},
	// 				tags: tags,
	// 				attributes: attributes,
	// 				metaTags: metaTags,
	// 				content: content,
	// 				media: media,
	// 				slug: oPost.en_name,
	// 				createdAt: oPost.createdAt,
	// 				updatedAt: oPost.updatedAt,
	// 				deletedAt: null,
	// 				likeCount: (await this.db.collection("PeeyadePivotLikeAndUsers").findOne({ pivot: oPost._id }))?.likeCount || 0,
	// 				saveCount: (await this.db.collection("PeeyadePivotSaveAndUsers").findOne({ pivot: oPost._id }))?.saveCount || 0,
	// 				shareCount: (await this.db.collection("PeeyadePivotShareAndUsers").findOne({ pivot: oPost._id }))?.shareCount || 0,
	// 				viewCount: (await this.db.collection("PeeyadePivotViewAndUsers").findOne({ pivot: oPost._id }))?.viewCount || 0,
	// 				__v: 0,

	// 			});












	// 			const inserted = await this.db.collection("PeeyadePivot").insertOne(pivot);

	// 			// oPost.authors[0] });
	// 			// _id: oPost.discoverers[0]
	// 			if (!author) {
	// 				console.log(`${index} WithOut Author => postId: ${oPost._id}, ${oPost.authors}`);
	// 			}
	// 			if (!discoverer) {
	// 				console.log(`${index} WithOut Discoverer => postId: ${oPost._id}, ${oPost.discoverers}`);
	// 			}

	// 			console.log(`${index}`);

	// 		}

	// 		return "pivot";

	// 	}


	// 	async extractTags() {
	// 		const pivots = await this.db
	// 			.collection("PeeyadePivot")
	// 			.find<Pivot>()
	// 			//.limit(10)
	// 			.skip(0)
	// 			.toArray();

	// 		const tags: Tag[] = [];
	// 		for (let index = 0; index < pivots.length; index++) {
	// 			const pivot = pivots[index];
	// 			for (let index = 0; index < pivot.tags.length; index++) {
	// 				const tag = pivot.tags[index];
	// 				if (tags.findIndex((item => item._id.equals(tag._id))) == -1) {
	// 					tags.push(tag);
	// 					const inserted = await this.db.collection("PeeyadeTag").insertOne(tag);
	// 					console.log(index, inserted.insertedId);
	// 				}
	// 			}
	// 		}
	// 		return "tag";

	// 	}






	// 	async convertOldToNewUser() {
	// 		const users = this.db.collection("users")
	// 			.find()

	// 		await users.forEach((doc) => {
	// 			const contacts: Contact[] = [];

	// 			if (doc.services?.google) {
	// 				contacts.push(new Contact({
	// 					type: ContactType.Google,
	// 					url: doc.services.google,
	// 					verified: true,
	// 					iconURL: `http://ContactType.Google.com`
	// 				}))
	// 			}
	// 			if (doc.phone) {
	// 				contacts.push(new Contact({
	// 					type: ContactType.Phone,
	// 					url: doc.phone,
	// 					verified: true,
	// 					iconURL: `http://ContactType.Phone.com`
	// 				}))
	// 			}

	// 			if (doc.email) {
	// 				contacts.push(new Contact({
	// 					type: ContactType.Email,
	// 					url: doc.email,
	// 					verified: false,
	// 					iconURL: `http://ContactType.Email.com`
	// 				}))
	// 			}

	// 			let gender = Gender.Unknown;
	// 			switch (doc.gender) {
	// 				case "OTHER":
	// 					gender = Gender.Unknown
	// 					break;
	// 				case "MALE":
	// 					gender = Gender.Male
	// 					break;
	// 				case "FEMALE":
	// 					gender = Gender.Female
	// 					break;
	// 				default:
	// 					gender = Gender.Unknown
	// 					break;
	// 			}
	// 			const newUser = new User({
	// 				_id: doc._id,
	// 				biography: doc.biography || "",
	// 				contacts: contacts,
	// 				birthDate: doc.birthday || new Date(),
	// 				gender: gender,
	// 				name: `${doc.name}${doc.username ? "@" + doc.username : ""}`,
	// 				type: UserType.user,
	// 				...(doc.image && {
	// 					avatar: {
	// 						type: MediaType.image,
	// 						height: doc.image.height,
	// 						width: doc.image.width,
	// 						url: doc.image.url
	// 					}
	// 				}),
	// 				createdAt: doc.createdAt,
	// 				updatedAt: doc.updatedAt,
	// 				deletedAt: null,
	// 				__v: 0
	// 			})
	// 			this.db.collection("PeeyadeUser")
	// 				.insertOne(newUser).then((doc) => console.log(doc.insertedId));
	// 		})
	// 	}



	// }





	// [
	// 	{
	// 		'$group': {
	// 			'_id': '$in_app_id',
	// 			'pivot': {
	// 				'$first': '$pivot'
	// 			},
	// 			'totalCheckInCount': {
	// 				'$sum': '$checkInCount'
	// 			},
	// 			'users': {
	// 				'$push': '$user'
	// 			}
	// 		}
	// 	}, {
	// 		'$sort': {
	// 			'totalCheckInCount': -1
	// 		}
	// 	}
	// ]

}