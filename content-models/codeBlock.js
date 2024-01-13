module.exports = function (migration) {
  const codeBlock = migration
    .createContentType("codeBlock")
    .name("Code block")
    .description("")
    .displayField("identifier");

  codeBlock
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

  codeBlock
    .createField("language")
    .name("Language")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([
      {
        in: ["javascript"],
      },
    ])
    .defaultValue({
      "en-US": "javascript",
    })
    .disabled(false)
    .omitted(false);

  codeBlock
    .createField("showLineNumbers")
    .name("Show line numbers?")
    .type("Boolean")
    .localized(false)
    .required(false)
    .validations([])
    .defaultValue({
      "en-US": false,
    })
    .disabled(false)
    .omitted(false);

  codeBlock
    .createField("code")
    .name("Code")
    .type("Text")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  codeBlock.changeFieldControl("identifier", "builtin", "singleLine", {});
  codeBlock.changeFieldControl("language", "builtin", "dropdown", {});
  codeBlock.changeFieldControl("showLineNumbers", "builtin", "boolean", {});
  codeBlock.changeFieldControl("code", "builtin", "multipleLine", {});
};
