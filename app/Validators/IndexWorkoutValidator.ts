import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class IndexWorkoutValidator {
	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({
		userId: schema.string(),
	});

	public messages: CustomMessages = {};
}
