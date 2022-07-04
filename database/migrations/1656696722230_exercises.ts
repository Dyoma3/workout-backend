import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
	protected tableName = 'exercises';

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id');
			table.string('name', 255).notNullable();
			table.string('body_part', 255).notNullable();
			table.string('category', 255).notNullable();
			table.integer('pr_reps');
			table.integer('pr_weight');
			table.timestamp('created_at', { useTz: true });
			table.timestamp('updated_at', { useTz: true });
		});
	}

	public async down() {
		this.schema.dropTable(this.tableName);
	}
}
