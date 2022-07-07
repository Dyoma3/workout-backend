import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class WorkoutsController {
	public async index({ params }: HttpContextContract) {
		const user = await User.findOrFail(params.user_id);
		const workouts = await user.related('workouts').query();
		return workouts.map((workout) => workout.toJSON());
	}
}
