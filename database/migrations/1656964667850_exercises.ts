import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
	protected tableName = 'exercises';

	public async up() {
		this.schema.alterTable(this.tableName, (table) => {
			table.dropColumns('pr_reps', 'pr_weight');
		});
	}

	public async down() {
		this.schema.alterTable(this.tableName, (table) => {
			table.integer('pr_reps');
			table.integer('pr_weight');
		});
	}
}
