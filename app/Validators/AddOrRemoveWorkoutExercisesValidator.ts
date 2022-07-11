import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AddOrRemoveWorkoutExercisesValidator {
	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({
		exercises: schema.array().members(schema.number()),
	});

	public messages: CustomMessages = {};
}
