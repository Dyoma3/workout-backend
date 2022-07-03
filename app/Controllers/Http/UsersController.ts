import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import authConfig from 'Config/auth';

export default class UsersController {
	public async signup({ request, auth }: HttpContextContract) {
		const name: string = request.input('name');
		const email: string = request.input('email');
		const password: string = request.input('password');

		// in case user already exists
		const user = User.findBy('email', email);

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
}
