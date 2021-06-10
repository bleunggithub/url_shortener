
exports.up = function(knex) {
    return knex.schema
        .createTable('urls', function(table) {
            table.increments('id').unsigned().primary();
            table.string('url_id');
            table.string('long_url');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });    
};

exports.down = function(knex) {
    return knex.schema.dropTable('urls')
};
