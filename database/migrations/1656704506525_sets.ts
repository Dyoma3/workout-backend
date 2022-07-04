import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
	protected tableName = 'sets';

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id');
			table.integer('workout_exercise_id').references('workout_exercises.id').onDelete('CASCADE');
			table.integer('weight');
			table.integer('reps');
			table.timestamp('created_at', { useTz: true });
			table.timestamp('updated_at', { useTz: true });
		});
	}

	public async down() {
		this.schema.dropTable(this.tableName);
	}
}
