import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Exercise from 'App/Models/Exercise';

export default class ExercisesController {
	public async index() {
		return await Exercise.all();
	}

	public async store({ request, auth, response }: HttpContextContract) {
		await auth.use('api').authenticate();
		const { name, bodyPart, category } = request.body();
		const exercise = await Exercise.create({
			name,
			bodyPart,
			category,
		});
		response.status(201);
		return exercise;
	}

	public async destroy({ params, auth, response }: HttpContextContract) {
		await auth.use('api').authenticate();
		const exercise = await Exercise.findOrFail(params.id);
		await exercise.delete();
		response.status(204);
		return;
	}
}
