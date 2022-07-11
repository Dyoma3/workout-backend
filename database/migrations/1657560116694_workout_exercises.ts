import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
	protected tableName = 'workout_exercise';

	public async up() {
		this.schema.alterTable(this.tableName, (table) => {
			table.unique(['workout_id', 'exercise_id']);
		});
	}

	public async down() {
		this.schema.alterTable(this.tableName, (table) => {
			table.dropUnique(['workout_id', 'exercise_id']);
		});
	}
}
