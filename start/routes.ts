import Route from '@ioc:Adonis/Core/Route';

Route.get('/', async () => {
	return { hello: 'world' };
});

Route.resource('users', 'UsersController').only(['update', 'destroy', 'index', 'show']).middleware({
	update: 'auth',
	destroy: 'auth',
});

Route.post('signup', 'UsersController.signup');

Route.post('login', 'UsersController.login');

Route.resource('exercises', 'ExercisesController').apiOnly().middleware({
	store: 'auth',
	update: 'auth',
	destroy: 'auth',
});

Route.resource('users.workouts', 'WorkoutsController').apiOnly().middleware({
	store: 'auth',
	update: 'auth',
	destroy: 'auth',
});

Route.patch(
	'users/:user_id/workouts/:id/add-exercises',
	'WorkoutsController.addExercises'
).middleware('auth');

Route.patch(
	'users/:user_id/workouts/:id/remove-exercises',
	'WorkoutsController.removeExercises'
).middleware('auth');
