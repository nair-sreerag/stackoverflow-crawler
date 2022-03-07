/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTableIfNotExists("urls", (table) => {
      table.increments("id").unsigned().primary();

      table.string("url").notNullable().unique().index();
      table.bigInteger("ref_count").defaultTo(0);
      table.bigInteger("upvote_count").defaultTo(0);
      table.bigInteger("answer_count").defaultTo(0);

      // table.timestamps(false, true);

      table
        .dateTime("created_at")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
      table
        .dateTime("updated_at")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTableIfNotExists("ref_storage", (table) => {
      table.increments("id").unsigned().primary();
      table
        .bigInteger("ref_id")
        .comment(
          "reference of the url which is already stored in the urls table"
        )
        .defaultTo(0)
        .notNullable();
      table
        .string("found_in")
        .comment(
          "this stores the reference of the page the ref url was found in"
        )
        .notNullable();

      table
        .dateTime("created_at")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
      table
        .dateTime("updated_at")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("urls").dropTableIfExists("ref_storage");
};
