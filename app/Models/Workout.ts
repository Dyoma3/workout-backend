import { DateTime } from 'luxon';
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import User from './User';

export default class Workout extends BaseModel {
	@column({ isPrimary: true })
	public id: number;

	@column()
	public name: string;

	@column()
	public template: boolean;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime;

	@column.dateTime()
	public endTime: DateTime | null;

	@hasOne(() => User)
	public user: HasOne<typeof User>;
}
