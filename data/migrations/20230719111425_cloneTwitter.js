/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("user_id");
      table.string("username", 255).notNullable();
      table.string("password", 255).notNullable();
      table.string("email", 255).notNullable();
      table.timestamp("tarih").defaultTo(knex.fn.now());
    })
    .createTable("posts", function (table) {
      table.increments("post_id");
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("user_id").inTable("users");
      table.string("content", 255).notNullable();
      table.integer("like_sayisi").defaultTo(0);
      table.timestamp("tarih").defaultTo(knex.fn.now());
    })
    .createTable("comments", function (table) {
      table.increments("comment_id");
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("user_id").inTable("users");
      table.integer("post_id").unsigned().notNullable();
      table.foreign("post_id").references("post_id").inTable("posts");
      table.string("content", 255).notNullable();
      table.integer("like_sayisi").notNullable();
      table.timestamp("tarih").defaultTo(knex.fn.now());
    })
    .createTable("likes", function (table) {
      table.increments("like_id");
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("user_id").inTable("users");
      table.integer("post_id").unsigned();
      table.foreign("post_id").references("post_id").inTable("posts");
      table.integer("comment_id").unsigned();
      table.foreign("comment_id").references("comment_id").inTable("comments");
      table.timestamp("tarih").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("likes")
    .dropTable("comments")
    .dropTable("posts")
    .dropTable("users");
};
