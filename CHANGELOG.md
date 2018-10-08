## 1.2.0 (2018-10-08)

### Bug fixes

Fixes an issue where the Markdown serializer would escape special characters in inline code.

### New features

Upgrade the markdown-it dependency to version 8.

## 1.1.1 (2018-07-08)

### Bug fixes

Fix bug that caused superfluous backslashes to be inserted at the start of some lines when serializing to Markdown.

## 1.1.0 (2018-06-20)

### New features

You can now override the handling of softbreak tokens in a custom handler.

## 1.0.4 (2018-04-17)

### Bug fixes

Fix crash when serializing marks with line breaks inside of them.

## 1.0.3 (2018-01-10)

### Bug fixes

Fix dependency version range for prosemirror-model.

## 1.0.2 (2017-12-07)

### Bug fixes

Code blocks are always wrapped in triple backticks when serializing, to avoid parsing corner cases around indented code blocks.

## 1.0.1 (2017-11-05)

### Bug fixes

Link marks are now non-inclusive (typing after them produces non-linked text).

## 1.0.0 (2017-10-13)

First stable release.
