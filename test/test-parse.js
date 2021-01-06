const {eq} = require("prosemirror-test-builder")
const ist = require("ist")

const {schema, defaultMarkdownParser, defaultMarkdownSerializer} = require("..")

const {doc, blockquote, h1, h2, p, hr, li, ol, ol3, ul, pre, em, strong, code, a, link, br, img} = require("./build")

function parse(text, doc) {
  ist(defaultMarkdownParser.parse(text), doc, eq)
}

function serialize(doc, text) {
  ist(defaultMarkdownSerializer.serialize(doc), text)
}

function same(text, doc) {
  parse(text, doc)
  serialize(doc, text)
}

describe("markdown", () => {
  it("parses a paragraph", () =>
     same("hello!",
          doc(p("hello!"))))

  it("parses headings", () =>
     same("# one\n\n## two\n\nthree",
          doc(h1("one"), h2("two"), p("three"))))

  it("parses a blockquote", () =>
     same("> once\n\n> > twice",
          doc(blockquote(p("once")), blockquote(blockquote(p("twice"))))))

  // FIXME bring back testing for preserving bullets and tight attrs
  // when supported again

  it("parses a bullet list", () =>
     same("* foo\n\n  * bar\n\n  * baz\n\n* quux",
          doc(ul(li(p("foo"), ul(li(p("bar")), li(p("baz")))), li(p("quux"))))))

  it("parses an ordered list", () =>
     same("1. Hello\n\n2. Goodbye\n\n3. Nest\n\n   1. Hey\n\n   2. Aye",
          doc(ol(li(p("Hello")), li(p("Goodbye")), li(p("Nest"), ol(li(p("Hey")), li(p("Aye"))))))))

  it("preserves ordered list start number", () =>
     same("3. Foo\n\n4. Bar",
          doc(ol3(li(p("Foo")), li(p("Bar"))))))

  it("parses a code block", () =>
     same("Some code:\n\n```\nHere it is\n```\n\nPara",
          doc(p("Some code:"), schema.node("code_block", {params: ""}, [schema.text("Here it is")]), p("Para"))))

  it("parses an intended code block", () =>
     parse("Some code:\n\n    Here it is\n\nPara",
          doc(p("Some code:"), pre("Here it is"), p("Para"))))

  it("parses a fenced code block with info string", () =>
     same("foo\n\n```javascript\n1\n```",
          doc(p("foo"), schema.node("code_block", {params: "javascript"}, [schema.text("1")]))))

  it("parses inline marks", () =>
     same("Hello. Some *em* text, some **strong** text, and some `code`",
          doc(p("Hello. Some ", em("em"), " text, some ", strong("strong"), " text, and some ", code("code")))))

  it("parses overlapping inline marks", () =>
     same("This is **strong *emphasized text with `code` in* it**",
          doc(p("This is ", strong("strong ", em("emphasized text with ", code("code"), " in"), " it")))))

  it("parses links inside strong text", () =>
     same("**[link](foo) is bold**",
          doc(p(strong(a("link"), " is bold")))))

  it("parses code mark inside strong text", () =>
     same("**`code` is bold**",
          doc(p(strong(code("code"), " is bold")))))

  it("parses code mark containing backticks", () =>
     same("``` one backtick: ` two backticks: `` ```",
          doc(p(code("one backtick: ` two backticks: ``")))))

  it("parses code mark containing only whitespace", () =>
     serialize(doc(p("Three spaces: ", code("   "))),
               "Three spaces: `   `"))

  it("parses links", () =>
     same("My [link](foo) goes to foo",
          doc(p("My ", a("link"), " goes to foo"))))

  it("parses urls", () =>
     same("Link to <https://prosemirror.net>",
          doc(p("Link to ", link({href: "https://prosemirror.net"}, "https://prosemirror.net")))))

  it("correctly serializes relative urls", () => {
    same("[foo.html](foo.html)",
         doc(p(link({href: "foo.html"}, "foo.html"))))
  })

  it("parses emphasized urls", () =>
     same("Link to *<https://prosemirror.net>*",
          doc(p("Link to ", em(link({href: "https://prosemirror.net"}, "https://prosemirror.net"))))))

  it("parses an image", () =>
     same("Here's an image: ![x](img.png)",
          doc(p("Here's an image: ", img))))

  it("parses a line break", () =>
     same("line one\\\nline two",
          doc(p("line one", br, "line two"))))

  it("parses a horizontal rule", () =>
     same("one two\n\n---\n\nthree",
          doc(p("one two"), hr, p("three"))))

  it("ignores HTML tags", () =>
     same("Foo < img> bar",
          doc(p("Foo < img> bar"))))

  it("doesn't accidentally generate list markup", () =>
     same("1\\. foo",
          doc(p("1. foo"))))

  it("doesn't fail with line break inside inline mark", () =>
     same("**text1\ntext2**", doc(p(strong("text1\ntext2")))))

  it("drops trailing hard breaks", () =>
     serialize(doc(p("a", br, br)), "a"))

  it("expels enclosing whitespace from inside emphasis", () =>
     serialize(doc(p("Some emphasized text with", strong(em("  whitespace   ")), "surrounding the emphasis.")),
               "Some emphasized text with  ***whitespace***   surrounding the emphasis."))

  it("drops nodes when all whitespace is expelled from them", () =>
     serialize(doc(p("Text with", em(" "), "an emphasized space")),
               "Text with an emphasized space"))

  it("preserves list tightness", () => {
    same("* foo\n* bar", doc(ul({tight: true}, li(p("foo")), li(p("bar")))))
    same("1. foo\n2. bar", doc(ol({tight: true}, li(p("foo")), li(p("bar")))))
  })

  it("doesn't put a code block after a list item inside the list item", () =>
     same("* list item\n\n```\ncode\n```",
          doc(ul({tight: true}, li(p("list item"))), pre("code"))))

  it("doesn't escape characters in code", () =>
     same("foo`*`", doc(p("foo", code("*")))))
})
