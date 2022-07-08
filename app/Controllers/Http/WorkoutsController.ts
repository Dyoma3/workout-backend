import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import CreateWorkout from 'App/Validators/CreateWorkoutValidator';
import UpdateWorkout from 'App/Validators/UpdateWorkoutValidator';

export default class WorkoutsController {
	public async index({ params }: HttpContextContract) {
		const user = await User.findOrFail(params.user_id);
		const workouts = await user.related('workouts').query();
		return workouts.map((workout) => workout.toJSON());
	}

	public async show({ params }: HttpContextContract) {
		const { user_id: userId, id } = params;
		const user = await User.findOrFail(userId);
		return await user.related('workouts').query().where('id', id).firstOrFail();
	}

	public async store({ auth, request }: HttpContextContract) {
		const { name, template } = await request.validate(CreateWorkout);
		return (
			await auth.user!.related('workouts').create({
				name,
				template: Boolean(template),
			})
		).toJSON();
	}

	public async update({ auth, request, params }: HttpContextContract) {
		const payload = await request.validate(UpdateWorkout);
		const workout = await auth
			.user!.related('workouts')
			.query()
			.where('id', params.id)
			.firstOrFail();
		workout.merge(payload);
		await workout.save();
		return workout.toJSON();
	}

	public async destroy({ params, auth, response }: HttpContextContract) {
		const workout = await auth
			.user!.related('workouts')
			.query()
			.where('id', params.id)
			.firstOrFail();
		await workout.delete();
		response.status(204);
		return;
	}
}
