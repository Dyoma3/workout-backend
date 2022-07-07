import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Exercise from 'App/Models/Exercise';
import CreateExercise from 'App/Validators/CreateExerciseValidator';
import UpdateExercise from 'App/Validators/UpdateExerciseValidator';

export default class ExercisesController {
	public async index() {
		return (await Exercise.all()).map((exercise) => exercise.toJSON());
	}

	public async show({ params }: HttpContextContract) {
		return (await Exercise.findOrFail(params.id)).toJSON();
	}

	public async store({ request, auth, response }: HttpContextContract) {
		const payload = await request.validate(CreateExercise);
		await auth.use('api').authenticate();
		const { name, bodyPart, category } = payload;
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

	public async update({ params, request }: HttpContextContract) {
		const payload = await request.validate(UpdateExercise);
		const { id } = params;
		const exercise = await Exercise.findOrFail(id);
		exercise.merge(payload);
		await exercise.save();
		return exercise.toJSON();
	}
}
