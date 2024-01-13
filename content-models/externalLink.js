module.exports = function (migration) {
  const externalLink = migration
    .createContentType("externalLink")
    .name("External Link")
    .description("")
    .displayField("identifier");

  externalLink
    .createField("identifier")
    .name("Identifier")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  externalLink
    .createField("text")
    .name("Text")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  externalLink
    .createField("url")
    .name("URL")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  externalLink.changeFieldControl("identifier", "builtin", "singleLine", {});
  externalLink.changeFieldControl("text", "builtin", "singleLine", {});
  externalLink.changeFieldControl("url", "builtin", "urlEditor", {});
};
