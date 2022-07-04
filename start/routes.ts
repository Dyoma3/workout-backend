import Route from '@ioc:Adonis/Core/Route';

Route.get('/', async () => {
	return { hello: 'world' };
});

Route.resource('users', 'UsersController').only(['update', 'destroy']).middleware({
	'*': 'auth',
});

Route.post('signup', 'UsersController.signup');

Route.post('login', 'UsersController.login');

Route.resource('exercises', 'ExercisesController').apiOnly();
