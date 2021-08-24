
exports.up = function(knex) {
  return knex.schema
      .createTable('nakupi', (table) => {
          table.integer('uporabnikID').unsigned();
          table.foreign('uporabnikID').references('uporabniki.id');
          table.decimal('znesek');
          table.dateTime('datum');
          table.string('izdelki');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('nakupi');
};

