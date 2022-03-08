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
      // table.bigInteger("page_number").defaultTo(0).comment('stores the page number it was found in');
      table.bigInteger("upvote_count").nullable();
      table.bigInteger("answer_count").nullable();
      
      table.bigInteger("question_id").nullable().comment('the stackoverflow question id');
      table.datetime("datetime_asked").comment('stores the datetime the question was asked on');

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


    //  REF_TABLE
    .createTableIfNotExists("ref_storage", (table) => {
      table.increments("id").unsigned().primary();

      table
      .string("found_in")
      .comment(
        "this stores the reference of the page the ref url was found in"
      )
      .notNullable();

      table
        .string("url")
        .comment(
          // "reference of the url which is already stored in the urls table"
        "url found in the related section of a question"
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
