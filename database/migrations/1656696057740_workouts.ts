import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
	protected tableName = 'workouts';

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id');
			table.integer('user_id').references('users.id').onDelete('CASCADE');
			table.string('name', 255).notNullable();
			table.boolean('template').notNullable();
			table.timestamp('created_at', { useTz: true });
			table.timestamp('updated_at', { useTz: true });
			table.timestamp('end_time', { useTz: true });
		});
	}

	public async down() {
		this.schema.dropTable(this.tableName);
	}
}
