import { DateTime } from 'luxon';
import { BaseModel, column, hasManyThrough, HasManyThrough } from '@ioc:Adonis/Lucid/Orm';
import Set from './Set';
import WorkoutExercise from './WorkoutExercise';

export default class Exercise extends BaseModel {
	@column({ isPrimary: true })
	public id: number;

	@column()
	public name: string;

	@column()
	public bodyPart: string;

	@column()
	public category: string;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime;

	@hasManyThrough([() => Set, () => WorkoutExercise])
	public sets: HasManyThrough<typeof Set>;
}
