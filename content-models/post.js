module.exports = function (migration) {
  const post = migration
    .createContentType("post")
    .name("Post")
    .description("")
    .displayField("slug");

  post
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
      {
        regexp: {
          pattern: "^/[a-z-/]+$",
          flags: null,
        },

        message: "Only slashes, lowercase characters, and hyphens are accepted",
      },
      {
        prohibitRegexp: {
          pattern: "/$",
          flags: null,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  post
    .createField("date")
    .name("Date")
    .type("Date")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  post
    .createField("title")
    .name("Title")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  post
    .createField("seoTitle")
    .name("SEO title")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  post
    .createField("postTags")
    .name("Post Tags")
    .type("Array")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: "Link",

      validations: [
        {
          linkContentType: ["postTags"],
        },
      ],

      linkType: "Entry",
    });

  post
    .createField("content")
    .name("Content")
    .type("RichText")
    .localized(false)
    .required(false)
    .validations([
      {
        enabledMarks: [
          "bold",
          "italic",
          "underline",
          "code",
          "superscript",
          "subscript",
        ],
        message:
          "Only bold, italic, underline, code, superscript, and subscript marks are allowed",
      },
      {
        enabledNodeTypes: [
          "heading-1",
          "heading-2",
          "heading-3",
          "heading-4",
          "heading-5",
          "heading-6",
          "ordered-list",
          "unordered-list",
          "hr",
          "blockquote",
          "embedded-entry-block",
          "embedded-asset-block",
          "table",
          "asset-hyperlink",
          "embedded-entry-inline",
          "hyperlink",
          "entry-hyperlink",
        ],

        message:
          "Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, asset, table, link to asset, inline entry, link to Url, and link to entry nodes are allowed",
      },
      {
        nodes: {
          "embedded-entry-block": [
            {
              linkContentType: ["codePen", "codeBlock"],
              message: null,
            },
          ],

          "embedded-entry-inline": [
            {
              linkContentType: ["externalLink"],
              message: null,
            },
          ],

          "entry-hyperlink": [
            {
              linkContentType: ["post"],
              message: null,
            },
          ],
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  post.changeFieldControl("slug", "builtin", "slugEditor", {
    helpText: "Slashes, lowercase characters, and hyphens only",
  });

  post.changeFieldControl("date", "builtin", "datePicker", {});
  post.changeFieldControl("title", "builtin", "singleLine", {});
  post.changeFieldControl("seoTitle", "builtin", "singleLine", {});
  post.changeFieldControl("postTags", "builtin", "entryLinksEditor", {});
  post.changeFieldControl("content", "builtin", "richTextEditor", {});
};
