import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthMiddleware {
	public async handle({ auth, response, params }: HttpContextContract, next: () => Promise<void>) {
		const email: string = params.id;
		await auth.use('api').authenticate();
		const authUser = auth.use('api').user;
		if (authUser?.email !== email)
			return response.unauthorized({ error: "API token doesn't correspond to email" });
		await next();
	}
}
