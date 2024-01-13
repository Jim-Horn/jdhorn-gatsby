module.exports = function (migration) {
  const codePen = migration
    .createContentType("codePen")
    .name("CodePen")
    .description("")
    .displayField("identifier");

  codePen
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

  codePen
    .createField("hash")
    .name("Hash")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  codePen
    .createField("height")
    .name("Height")
    .type("Integer")
    .localized(false)
    .required(false)
    .validations([])
    .defaultValue({
      "en-US": 375,
    })
    .disabled(false)
    .omitted(false);

  codePen
    .createField("showResult")
    .name("Show result?")
    .type("Boolean")
    .localized(false)
    .required(false)
    .validations([])
    .defaultValue({
      "en-US": true,
    })
    .disabled(false)
    .omitted(false);

  codePen
    .createField("defaultTab")
    .name("Default tab")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([
      {
        in: ["CSS", "HTML", "JS", "None"],
      },
    ])
    .defaultValue({
      "en-US": "None",
    })
    .disabled(false)
    .omitted(false);

  codePen
    .createField("editable")
    .name("Editable")
    .type("Boolean")
    .localized(false)
    .required(true)
    .validations([])
    .defaultValue({
      "en-US": false,
    })
    .disabled(false)
    .omitted(false);

  codePen.changeFieldControl("identifier", "builtin", "singleLine", {});
  codePen.changeFieldControl("hash", "builtin", "singleLine", {});
  codePen.changeFieldControl("height", "builtin", "numberEditor", {});
  codePen.changeFieldControl("showResult", "builtin", "boolean", {});
  codePen.changeFieldControl("defaultTab", "builtin", "radio", {});
  codePen.changeFieldControl("editable", "builtin", "boolean", {});
};
