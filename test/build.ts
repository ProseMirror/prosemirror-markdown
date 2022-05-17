import {builders, NodeBuilder, MarkBuilder} from "prosemirror-test-builder"
import {schema} from "prosemirror-markdown"

const b = builders(schema, {
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
}) as any

export const doc: NodeBuilder = b.doc
export const p: NodeBuilder = b.p
export const h1: NodeBuilder = b.h1
export const h2: NodeBuilder = b.h2
export const hr: NodeBuilder = b.hr
export const li: NodeBuilder = b.li
export const ol: NodeBuilder = b.ol
export const ol3: NodeBuilder = b.ol3
export const ul: NodeBuilder = b.ul
export const pre: NodeBuilder = b.pre
export const blockquote: NodeBuilder = b.blockquote
export const br: NodeBuilder = b.br
export const img: NodeBuilder = b.img
export const a: MarkBuilder = b.a
export const link: MarkBuilder = b.link
export const em: MarkBuilder = b.em
export const strong: MarkBuilder = b.strong
export const code: MarkBuilder = b.code
