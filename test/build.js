const {block, mark, dataImage} = require("prosemirror-model/test/build")
const {schema} = require("../dist/schema")

module.exports = {
  doc: block(schema.nodes.doc),
  p: block(schema.nodes.paragraph),
  blockquote: block(schema.nodes.blockquote),
  h1: block(schema.nodes.heading, {level: 1}),
  h2: block(schema.nodes.heading, {level: 2}),
  hr: schema.nodes.horizontal_rule.create(),
  li: block(schema.nodes.list_item),
  ol: block(schema.nodes.ordered_list),
  ul: block(schema.nodes.bullet_list),
  pre: block(schema.nodes.code_block),
  em: mark(schema.marks.em),
  strong: mark(schema.marks.strong),
  code: mark(schema.marks.code),
  a: mark(schema.marks.link, {href: "http://foo"}),
  br: schema.nodes.hard_break.create(),
  dataImage: dataImage,
  img: schema.nodes.image.create({src: dataImage, alt: "x"})
}
