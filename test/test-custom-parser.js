const {eq} = require("prosemirror-test-builder")
const ist = require("ist")

const markdownit = require("markdown-it")
const {schema, MarkdownParser} = require("../dist")

const {doc, p} = require("./build")

const md = markdownit("commonmark", {html: false})
const ignoreBlockquoteParser = new MarkdownParser(schema, md, {
  blockquote: {ignore: true},
  paragraph: {block: "paragraph"}
})

function parseWith(parser) {
  return (text, doc) => {
    ist(parser.parse(text), doc, eq)
  }
}

describe("custom markdown parser", () => {
  it("ignores a blockquote", () =>
     parseWith(ignoreBlockquoteParser)("> hello!",
          doc(p("hello!"))))
})
