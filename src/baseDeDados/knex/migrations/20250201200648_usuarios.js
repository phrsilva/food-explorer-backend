exports.up = knex => knex.schema.createTable("usuarios", table => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("email").notNullable();
    table.text("senha").notNullable();
  
    table
    .enum("perfil", ["cliente", "admin"], {useNative: true, enumName: "perfil"})
    .notNullable().default("cliente");
  
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });
  
  exports.down = knex => knex.schema.dropTable("usuarios");