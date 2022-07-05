import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateExerciseValidator {
	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({
		name: schema.string.optional([rules.trim()]),
		bodyPart: schema.string.optional([rules.trim()]),
		category: schema.string.optional([rules.trim()]),
	});

	public messages: CustomMessages = {};
}
