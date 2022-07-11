import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import CreateSet from 'App/Validators/CreateSetValidator';
import UpdateSet from 'App/Validators/UpdateSetValidator';
import User from 'App/Models/User';
import DeleteSet from 'App/Validators/DeleteSetValidator';

async function getWorkoutExercise(user: User, workoutId: number, exerciseId: number) {
	const workout = await user.related('workouts').query().where({ id: workoutId }).firstOrFail();
	return await workout.related('workoutExercises').query().where({ exerciseId }).firstOrFail();
}

export default class SetsController {
	public async store({ auth, request, params, response }: HttpContextContract) {
		const { workout_id: workoutId } = params;
		const { weight, reps, exerciseId } = await request.validate(CreateSet);
		const workoutExercise = await getWorkoutExercise(auth.user!, workoutId, exerciseId);
		const set = await workoutExercise.related('sets').create({ weight, reps });
		response.status(201);
		return set.toJSON();
	}

	public async update({ auth, request, params }: HttpContextContract) {
		const { id, workout_id: workoutId } = params;
		const { weight, reps, exerciseId } = await request.validate(UpdateSet);
		const workoutExercise = await getWorkoutExercise(auth.user!, workoutId, exerciseId);
		const set = await workoutExercise.related('sets').query().where({ id }).firstOrFail();
		set.merge({ weight, reps });
		await set.save();
		return set.toJSON();
	}

	public async destroy({ auth, params, request, response }: HttpContextContract) {
		const { id, workout_id: workoutId } = params;
		const { exerciseId } = await request.validate(DeleteSet);
		const workoutExercise = await getWorkoutExercise(auth.user!, workoutId, exerciseId);
		const set = await workoutExercise.related('sets').query().where({ id }).firstOrFail();
		await set.delete();
		response.status(204);
		return;
	}
}
