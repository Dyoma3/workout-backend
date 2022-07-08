import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import WorkoutExercise from './WorkoutExercise';

export default class Workout extends BaseModel {
	@column({ isPrimary: true })
	public id: number;

	@column()
	public userId: number;

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

	@belongsTo(() => User)
	public user: BelongsTo<typeof User>;

	@hasMany(() => WorkoutExercise)
	public workoutExercises: HasMany<typeof WorkoutExercise>;
}
