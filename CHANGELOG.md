## 1.3.0 (2019-01-22)

### Bug fixes

Inline code containing backticks is now serialized wrapped in the appropriate amount of backticks.

### New features

The serializer now serializes links whose target is the same as their text content using \< \> syntax.

Mark opening and close string callbacks now get passed the mark's context (parent fragment and index).

## 1.2.2 (2018-11-22)

### Bug fixes

Hard breaks at the end of an emphasized or strong mark are no longer serialized to invalid Markdown text.

## 1.2.1 (2018-10-19)

### Bug fixes

Fixes a bug where inline mark delimiters were serialized incorrectly (the closing and opening marks were swapped, which was only noticeable when they are different).

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
