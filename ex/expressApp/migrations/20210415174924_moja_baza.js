// tukaj ustvarimo in napolnimo bazo z začetnimi podatki  (knex migrate:latest)
exports.up = function (knex) {
    return knex.schema
        .createTable('uporabniki', (table) => {
            table.increments('id').primary();
            table.string('ime');
            table.decimal('geslo');
            table.string('role');
        }).createTable('izdelki', (table) => {
            table.increments('id').primary();
            table.string('naziv');
            table.string('velikost');
            table.decimal('cena');
            table.integer('kolicina');
            table.string('src');
            table.decimal('popust');
        })
};


// tukaj bazo pobrišemo in povrnemo v začetno stanje (knex migrate:rollback)
exports.down = function (knex) {
    return knex.schema.dropTable('uporabniki').dropTable('izdelki');
};

