import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateWorkoutValidator {
	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({
		name: schema.string([rules.trim()]),
		template: schema.boolean.optional(),
		exercises: schema.array().members(schema.number()),
	});

	public messages: CustomMessages = {};
}
