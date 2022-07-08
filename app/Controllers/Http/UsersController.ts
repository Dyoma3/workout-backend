import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class UsersController {
	public async index() {
		return (await User.all()).map((user) => user.toJSON());
	}

	public async show({ params }: HttpContextContract) {
		return (await User.findOrFail(params.id)).toJSON();
	}

	public async signup({ request, auth }: HttpContextContract) {
		const name: string = request.input('name');
		const email: string = request.input('email');
		const password: string = request.input('password');
		const user = await User.findBy('email', email);
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

	public async update({ params, request }: HttpContextContract) {
		const user = await User.findOrFail(params.id);
		user.name = request.input('name');
		await user.save();
		return user.toJSON();
	}

	public async destroy({ params, response }: HttpContextContract) {
		const user = await User.findOrFail(params.id);
		await user.delete();
		response.status(204);
		return;
	}
}
