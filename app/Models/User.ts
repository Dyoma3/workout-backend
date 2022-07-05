import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import { BaseModel, column, beforeSave, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Workout from './Workout';

export default class User extends BaseModel {
	@column({ isPrimary: true })
	public id: number;

	@column()
	public email: string;

	@column()
	public name: string;

	@column({ serializeAs: null })
	public password: string;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime;

	@hasMany(() => Workout)
	public workouts: HasMany<typeof Workout>;

	@beforeSave()
	public static async hashPassword(user: User) {
		if (user.$dirty.password) {
			user.password = await Hash.make(user.password);
		}
	}
}
