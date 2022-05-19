# prosemirror-markdown

[ [**WEBSITE**](http://prosemirror.net) | [**ISSUES**](https://github.com/prosemirror/prosemirror-markdown/issues) | [**FORUM**](https://discuss.prosemirror.net) | [**GITTER**](https://gitter.im/ProseMirror/prosemirror) ]

This is a (non-core) module for [ProseMirror](http://prosemirror.net).
ProseMirror is a well-behaved rich semantic content editor based on
contentEditable, with support for collaborative editing and custom
document schemas.

This module implements a ProseMirror
[schema](https://prosemirror.net/docs/guide/#schema) that corresponds to
the document schema used by [CommonMark](http://commonmark.org/), and
a parser and serializer to convert between ProseMirror documents in
that schema and CommonMark/Markdown text.

This code is released under an
[MIT license](https://github.com/prosemirror/prosemirror/tree/master/LICENSE).
There's a [forum](http://discuss.prosemirror.net) for general
discussion and support requests, and the
[Github bug tracker](https://github.com/prosemirror/prosemirror/issues)
is the place to report issues.

We aim to be an inclusive, welcoming community. To make that explicit,
we have a [code of
conduct](http://contributor-covenant.org/version/1/1/0/) that applies
to communication around the project.

## Documentation

 * **`schema`**`: Schema`\
   Document schema for the data model used by CommonMark.


### class MarkdownParser

A configuration of a Markdown parser. Such a parser uses
[markdown-it](https://github.com/markdown-it/markdown-it) to
tokenize a file, and then runs the custom rules it is given over
the tokens to create a ProseMirror document tree.

 * `new `**`MarkdownParser`**`(schema: Schema, tokenizer: any, tokens: Object)`\
   Create a parser with the given configuration. You can configure
   the markdown-it parser to parse the dialect you want, and provide
   a description of the ProseMirror entities those tokens map to in
   the `tokens` object, which maps token names to descriptions of
   what to do with them. Such a description is an object, and may
   have the following properties:

 * **`schema`**`: Schema`\
   The parser's document schema.

 * **`tokenizer`**`: any`\
   This parser's markdown-it tokenizer.

 * **`tokens`**`: Object`\
   The value of the `tokens` object used to construct this
   parser. Can be useful to copy and modify to base other parsers
   on.

 * **`parse`**`(text: string) → any`\
   Parse a string as [CommonMark](http://commonmark.org/) markup,
   and create a ProseMirror document as prescribed by this parser's
   rules.


 * **`defaultMarkdownParser`**`: MarkdownParser`\
   A parser parsing unextended [CommonMark](http://commonmark.org/),
   without inline HTML, and producing a document in the basic schema.


### class MarkdownSerializer

A specification for serializing a ProseMirror document as
Markdown/CommonMark text.

 * `new `**`MarkdownSerializer`**`(nodes: Object, marks: Object, options?: Object = {})`\
   Construct a serializer with the given configuration. The `nodes`
   object should map node names in a given schema to function that
   take a serializer state and such a node, and serialize the node.

    * **`options`**`?: Object`

       * **`escapeExtraCharacters`**`?: RegExp`\
         Extra characters can be added for escaping. This is passed
         directly to String.replace(), and the matching characters are
         preceded by a backslash.

 * **`nodes`**`: Object`\
   The node serializer functions for this serializer.

 * **`marks`**`: Object`\
   The mark serializer info.

 * **`options`**`: Object`

    * **`escapeExtraCharacters`**`?: RegExp`\
      Extra characters can be added for escaping. This is passed
      directly to String.replace(), and the matching characters are
      preceded by a backslash.

 * **`serialize`**`(content: Node, options?: Object = {}) → string`\
   Serialize the content of the given node to
   [CommonMark](http://commonmark.org/).

    * **`options`**`?: Object`

       * **`tightLists`**`?: boolean`\
         Whether to render lists in a tight style. This can be overridden
         on a node level by specifying a tight attribute on the node.
         Defaults to false.


### class MarkdownSerializerState

This is an object used to track state and expose
methods related to markdown serialization. Instances are passed to
node and mark serialization methods (see `toMarkdown`).

 * **`options`**`: {tightLists?: boolean, escapeExtraCharacters?: RegExp}`

 * **`wrapBlock`**`(delim: string, firstDelim: string, node: Node, f: fn())`\
   Render a block, prefixing each line with `delim`, and the first
   line in `firstDelim`. `node` should be the node that is closed at
   the end of the block, and `f` is a function that renders the
   content of the block.

 * **`ensureNewLine`**`()`\
   Ensure the current content ends with a newline.

 * **`write`**`(content?: string)`\
   Prepare the state for writing output (closing closed paragraphs,
   adding delimiters, and so on), and then optionally add content
   (unescaped) to the output.

 * **`closeBlock`**`(node: Node)`\
   Close the block for the given node.

 * **`text`**`(text: string, escape?: boolean = true)`\
   Add the given text to the document. When escape is not `false`,
   it will be escaped.

 * **`render`**`(node: Node, parent: Node, index: number)`\
   Render the given node as a block.

 * **`renderContent`**`(parent: Node)`\
   Render the contents of `parent` as block nodes.

 * **`renderInline`**`(parent: Node)`\
   Render the contents of `parent` as inline content.

 * **`renderList`**`(node: Node, delim: string, firstDelim: fn(index: number) → string)`\
   Render a node's content as a list. `delim` should be the extra
   indentation added to all lines except the first in an item,
   `firstDelim` is a function going from an item index to a
   delimiter for the first line of the item.

 * **`esc`**`(str: string, startOfLine?: boolean = false) → string`\
   Escape the given string so that it can safely appear in Markdown
   content. If `startOfLine` is true, also escape characters that
   have special meaning only at the start of the line.

 * **`repeat`**`(str: string, n: number) → string`\
   Repeat the given string `n` times.

 * **`markString`**`(mark: Mark, open: boolean, parent: Node, index: number) → string`\
   Get the markdown string for a given opening or closing mark.

 * **`getEnclosingWhitespace`**`(text: string) → {leading?: string, trailing?: string}`\
   Get leading and trailing whitespace from a string. Values of
   leading or trailing property of the return object will be undefined
   if there is no match.

 * **`defaultMarkdownSerializer`**`: MarkdownSerializer`\
   A serializer for the [basic schema](#schema).
