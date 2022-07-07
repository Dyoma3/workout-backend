import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import CreateWorkout from 'App/Validators/CreateWorkoutValidator';

export default class WorkoutsController {
	public async index({ params }: HttpContextContract) {
		const user = await User.findOrFail(params.user_id);
		const workouts = await user.related('workouts').query();
		return workouts.map((workout) => workout.toJSON());
	}

	public async store({ auth, request }: HttpContextContract) {
		const { name, template } = await request.validate(CreateWorkout);
		await auth.use('api').authenticate();
		if (!auth.user) return;
		return await auth.user?.related('workouts').create({
			name,
			template: Boolean(template),
		});
	}
}
