// MIT © 2016 azu
// LICENSE : MIT
"use strict";
const split = require("sentence-splitter").split;
const StringSource = require("textlint-util-to-string");
const RuleHelper = require("textlint-rule-helper").RuleHelper;
const isStartWithNewLine = (text) => {
    return text && text.charAt(0) === "\n";
};
const defaultOptions = {
    max: 50
};
module.exports = function(context, options = {}) {
    const maxLength = options.max || defaultOptions.max;
    const helper = new RuleHelper(context);
    const {Syntax, RuleError, report} = context;
    let sectionNodeCount = 0;
    return {
        [Syntax.Header](){
            sectionNodeCount = 0;
        },
        [Syntax.Paragraph](node){
            sectionNodeCount += 1;
            if (helper.isChildNode(node, [Syntax.BlockQuote])) {
                return;
            }
            const isFirstParagraph = sectionNodeCount === 1;
            if (!isFirstParagraph) {
                return;
            }
            const stringSource = new StringSource(node);
            const text = stringSource.toString();
            // empty break line == split sentence
            const sentences = split(text);
            if (sentences.length <= 0) {
                return;
            }
            const firstSentence = sentences[0];
            const sentenceText = firstSentence.value;
            // bigger than
            if (sentenceText.length > maxLength) {
                const currentLine = node.loc.start.line;
                const addedLine = isStartWithNewLine(sentenceText)
                    ? firstSentence.loc.start.line + 1// \n string
                    : firstSentence.loc.start.line - 1; // string
                const paddingLine = Math.max(addedLine, 0);
                const paddingIndex = firstSentence.range[0];
                report(node, new RuleError(`Line ${currentLine + paddingLine} exceeds the maximum sentence length of ${maxLength}.
First sentence should be short.`, {
                    index: paddingIndex
                }));
            }
        }
    }
};