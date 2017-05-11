// Defines a parser and serializer for [CommonMark](http://commonmark.org/) text.

exports.schema = require("./schema").schema
;({defaultMarkdownParser: exports.defaultMarkdownParser, defaultMarkdownParserTokens: exports.defaultMarkdownParserTokens, MarkdownParser: exports.MarkdownParser} = require("./from_markdown"))
;({MarkdownSerializer: exports.MarkdownSerializer, defaultMarkdownSerializer: exports.defaultMarkdownSerializer,
   MarkdownSerializerState: exports.MarkdownSerializerState} = require("./to_markdown"))
