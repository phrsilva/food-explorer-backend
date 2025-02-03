exports.up = knex => knex.schema.createTable("pratos", table => {
        table.increments("id");
        table.string("nome").notNullable();
        table.string("descricao").notNullable();
        table.float("preco").notNullable();
        table.enum("categoria", ["entrada", "principal", "sobremesa"], {useNative: true, enumName: "categoria"}).notNullable().default("principal");
        table.varchar("foto").default("pratoProvisorio.jpg");
        table.timestamp("created_at").default(knex.fn.now());
        table.timestamp("updated_at").default(knex.fn.now());
    });
    
    exports.down = knex => knex.schema.dropTable("pratos");