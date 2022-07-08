import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateWorkoutValidator {
	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({
		name: schema.string.optional([rules.trim()]),
		end_time: schema.date.nullableAndOptional(),
	});

	public messages: CustomMessages = {};
}
