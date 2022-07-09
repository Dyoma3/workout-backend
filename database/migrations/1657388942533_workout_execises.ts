import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
	protected tableName = 'workout_exercises';

	public async up() {
		this.schema.alterTable(this.tableName, (table) => {
			table.dropColumn('for_template');
		});
		this.schema.renameTable(this.tableName, 'workout_exercise');
	}

	public async down() {
		this.schema.renameTable('workout_exercise', this.tableName);
		this.schema.alterTable(this.tableName, (table) => {
			table.boolean('for_template').notNullable();
		});
	}
}
