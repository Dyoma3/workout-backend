import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Workout from 'App/Models/Workout';
import IndexWorkout from 'App/Validators/IndexWorkoutValidator';

export default class WorkoutsController {
	public async index({ request }: HttpContextContract) {
		const { userId } = await request.validate(IndexWorkout);
	}
}
