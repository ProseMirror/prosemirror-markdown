const {builders} = require("prosemirror-test-builder")
const {schema} = require("..")

module.exports = builders(schema, {
  p: {nodeType: "paragraph"},
  h1: {nodeType: "heading", level: 1},
  h2: {nodeType: "heading", level: 2},
  hr: {nodeType: "horizontal_rule"},
  li: {nodeType: "list_item"},
  ol: {nodeType: "ordered_list"},
  ol3: {nodeType: "ordered_list", order: 3},
  ul: {nodeType: "bullet_list"},
  pre: {nodeType: "code_block"},
  a: {markType: "link", href: "foo"},
  br: {nodeType: "hard_break"},
  img: {nodeType: "image", src: "img.png", alt: "x"}
})
