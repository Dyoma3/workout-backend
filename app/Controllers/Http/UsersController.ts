import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class UsersController {
	public async signup({ request, auth }: HttpContextContract) {
		const name: string = request.input('name');
		const email: string = request.input('email');
		const password: string = request.input('password');

		// in case user already exists
		const user = await User.findBy('email', email);

		// if it's a new user
		if (!user) await User.create({ name, email, password });

		const token = await auth.use('api').attempt(email, password);
		return token;
	}

	public async login({ request, auth }: HttpContextContract) {
		const email: string = request.input('email');
		const password: string = request.input('password');
		const token = await auth.use('api').attempt(email, password);
		return token;
	}

	public async update({ params, request, auth, response }: HttpContextContract) {
		/* const email: string = params.id;
		await auth.use('api').authenticate();
		const authUser = auth.use('api').user;
		if (authUser?.email !== email) {
			response.status(401);
			return {
				errors: [
					{
						message: "API token doesn't correspond to email",
					},
				],
			};
		} */

		const email: string = params.id;
		const user = await User.findByOrFail('email', email);
		user.name = request.input('name');
		await user.save();
		return user.toJSON();
	}

	public async destroy({ params, response }: HttpContextContract) {
		const email: string = params.id;
		const user = await User.findByOrFail('email', email);
		await user.delete();
		response.status(204);
		return {};
	}
}
