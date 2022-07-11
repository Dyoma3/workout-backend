import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class DeleteSetValidator {
	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({
		exerciseId: schema.number(),
	});

	public messages: CustomMessages = {};
}
