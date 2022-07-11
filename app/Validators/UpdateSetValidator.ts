import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateSetValidator {
	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({
		exerciseId: schema.number(),
		weight: schema.number.optional(),
		reps: schema.number.optional(),
	});

	public messages: CustomMessages = {};
}
