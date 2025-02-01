exports.up = knex => knex.schema.createTable("ingredientes", table => {
    table.increments("id");
    table.string("nome").notNullable();
    table.integer('prato_id').notNullable().references('id').inTable('pratos').onDelete('CASCADE');
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("ingredientes");