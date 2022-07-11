import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import CreateSet from 'App/Validators/CreateSetValidator';
import UpdateSet from 'App/Validators/UpdateSetValidator';

export default class SetsController {
	public async store({ auth, request, params, response }: HttpContextContract) {
		const { workout_id: workoutId } = params;
		const { weight, reps, exerciseId } = await request.validate(CreateSet);
		const workout = await auth
			.user!.related('workouts')
			.query()
			.where({ id: workoutId })
			.firstOrFail();
		const workoutExercise = await workout
			.related('workoutExercises')
			.query()
			.where({ exerciseId })
			.firstOrFail();
		const set = await workoutExercise.related('sets').create({ weight, reps });
		response.status(201);
		return set.toJSON();
	}

	public async update({ auth, request, params }: HttpContextContract) {
		const { id, workout_id: workoutId } = params;
		const { weight, reps, exerciseId } = await request.validate(UpdateSet);
		const workout = await auth
			.user!.related('workouts')
			.query()
			.where({ id: workoutId })
			.firstOrFail();
		const workoutExercise = await workout
			.related('workoutExercises')
			.query()
			.where({ exerciseId })
			.firstOrFail();
		const set = await workoutExercise.related('sets').query().where({ id }).firstOrFail();
		set.merge({ weight, reps });
		await set.save();
		return set.toJSON();
	}

	public async destroy({ response }: HttpContextContract) {
		response.status(204);
		return;
	}
}
