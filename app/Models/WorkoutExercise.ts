import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Exercise from './Exercise';
import Workout from './Workout';
import Set from 'App/Models/Set';

export default class WorkoutExercise extends BaseModel {
	public static table = 'workout_exercise';

	@column({ isPrimary: true })
	public id: number;

	@column()
	public exerciseId: number;

	@column()
	public workoutId: number;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime;

	@belongsTo(() => Exercise)
	public exercise: BelongsTo<typeof Exercise>;

	@belongsTo(() => Workout)
	public workout: BelongsTo<typeof Workout>;

	@hasMany(() => Set)
	public sets: HasMany<typeof Set>;
}
