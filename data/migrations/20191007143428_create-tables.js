
exports.up = function(knex) {
  return knex.schema
    .createTable('coaches', tbl => {
        tbl.increments();
        tbl
            .string('identity', 128)
            .notNullable() 
            .unique();
        tbl.string('password', 300).notNullable();
        tbl.string('email', 400)
        tbl.string('bio');
    })
    .createTable('patients', tbl => {
        tbl.increments();
        tbl
            .string('identity', 128)
            .notNullable() 
            .unique();
        tbl.string('password', 300).notNullable();
        tbl.string('email', 400)
        tbl.integer('coachId')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('coaches')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        tbl.string('bio');
    })
};

exports.down = function(knex) {
  return knex.schema 
    .dropTableIfExists('patients')
    .dropTableIfExists('coaches')
};
