import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Exercise from './Exercise';
import Workout from './Workout';

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
}
