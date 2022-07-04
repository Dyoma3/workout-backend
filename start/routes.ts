import Route from '@ioc:Adonis/Core/Route';

Route.get('/', async () => {
	return { hello: 'world' };
});

Route.resource('users', 'UsersController').only(['update', 'destroy']);

Route.post('signup', 'UsersController.signup');

Route.post('login', 'UsersController.login');
