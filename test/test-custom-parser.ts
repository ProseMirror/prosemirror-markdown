const {eq} = require("prosemirror-test-builder")
const ist = require("ist")

const markdownit = require("markdown-it")
const {schema, MarkdownParser} = require("..")

const {doc, p, hard_break} = require("./build")

const md = markdownit("commonmark", {html: false})
const ignoreBlockquoteParser = new MarkdownParser(schema, md, {
  blockquote: {ignore: true},
  paragraph: {block: "paragraph"},
  softbreak: {node: 'hard_break'}
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

  it("converts softbreaks to hard_break nodes", () =>
    parseWith(ignoreBlockquoteParser)("hello\nworld!",
         doc(p("hello", hard_break(), 'world!'))))
})
