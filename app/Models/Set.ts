import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import WorkoutExercise from 'App/Models/WorkoutExercise';

export default class Set extends BaseModel {
	@column({ isPrimary: true })
	public id: number;

	@column()
	public workoutExerciseId: number;

	@column()
	public weight: number;

	@column()
	public reps: number;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime;

	@belongsTo(() => WorkoutExercise)
	public workoutExercise: BelongsTo<typeof WorkoutExercise>;
}
