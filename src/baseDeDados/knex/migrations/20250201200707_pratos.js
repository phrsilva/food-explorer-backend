exports.up = knex => knex.schema.createTable("pratos", table => {
        table.increments("id");
        table.string("nome").notNullable();
        table.string("descricao").notNullable();
        table.string("preco").notNullable();
        table.varchar("foto").notNullable();
        table.timestamp("created_at").default(knex.fn.now());
        table.timestamp("updated_at").default(knex.fn.now());
    });
    
    exports.down = knex => knex.schema.dropTable("pratos");