module.exports = function (migration) {
  const postTags = migration
    .createContentType("postTags")
    .name("Post tags")
    .description("")
    .displayField("tag");

  postTags
    .createField("tag")
    .name("Tag")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
      {
        regexp: {
          pattern: "^[a-z-]+$",
          flags: null,
        },

        message: "This field only accepts lowercase characters and hyphens",
      },
    ])
    .disabled(false)
    .omitted(false);

  postTags
    .createField("friendlyName")
    .name("Friendly name")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  postTags.changeFieldControl("tag", "builtin", "singleLine", {
    helpText: "Lowercase characters and hyphens only",
  });

  postTags.changeFieldControl("friendlyName", "builtin", "singleLine", {});
};
