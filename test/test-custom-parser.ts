import {eq} from "prosemirror-test-builder"
import ist from "ist"
// @ts-ignore
import markdownit from "markdown-it"
import {Node} from "prosemirror-model"
import {schema, MarkdownParser} from "prosemirror-markdown"

import {doc, p, br} from "./build.js"

const md = markdownit("commonmark", {html: false})
const ignoreBlockquoteParser = new MarkdownParser(schema, md, {
  blockquote: {ignore: true},
  paragraph: {block: "paragraph"},
  softbreak: {node: 'hard_break'}
})

function parseWith(parser: MarkdownParser) {
  return (text: string, doc: Node) => {
    ist(parser.parse(text), doc, eq)
  }
}

describe("custom markdown parser", () => {
  it("ignores a blockquote", () =>
     parseWith(ignoreBlockquoteParser)("> hello!",
          doc(p("hello!"))))

  it("converts softbreaks to hard_break nodes", () =>
    parseWith(ignoreBlockquoteParser)("hello\nworld!",
         doc(p("hello", br(), 'world!'))))
})
