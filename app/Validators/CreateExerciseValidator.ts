import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateExerciseValidator {
	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({
		name: schema.string([rules.unique({ table: 'exercises', column: 'name' }), rules.trim()]),
		bodyPart: schema.string([rules.trim()]),
		category: schema.string([rules.trim()]),
	});

	public messages: CustomMessages = {};
}
