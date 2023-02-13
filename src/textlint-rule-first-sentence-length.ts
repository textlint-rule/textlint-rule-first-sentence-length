import { splitAST, SentenceSplitterSyntax } from "sentence-splitter";
import { StringSource } from "textlint-util-to-string";
import { RuleHelper } from "textlint-rule-helper";
import type { TextlintRuleModule } from "@textlint/types";
import type { TxtParagraphNode } from "@textlint/ast-node-types";

const defaultOptions = {
    max: 50
};
export type Options = {
    max?: number;
}
const report: TextlintRuleModule<Options> = function (context, options = {}) {
    const maxLength = options.max ?? defaultOptions.max;
    const helper = new RuleHelper(context);
    const { Syntax, RuleError, report, locator } = context;
    let sectionNodeCount = 0;
    return {
        [Syntax.Header]() {
            sectionNodeCount = 0;
        },
        [Syntax.Paragraph](node) {
            sectionNodeCount += 1;
            if (helper.isChildNode(node, [Syntax.BlockQuote])) {
                return;
            }
            const isFirstParagraph = sectionNodeCount === 1;
            if (!isFirstParagraph) {
                return;
            }
            const sentenceRoot = splitAST(node);
            const firstSentence = sentenceRoot.children.find((node) => SentenceSplitterSyntax.Sentence === node.type);
            if (!firstSentence) {
                return;
            }
            const firstSentenceSource = new StringSource(firstSentence as TxtParagraphNode);
            const sentenceText = firstSentenceSource.toString();
            // bigger than
            const sentenceLength = sentenceText.length;
            if (sentenceLength > maxLength) {
                report(node, new RuleError(`First sentence should be short.
                
The first sentence exceeds the maximum sentence length of ${maxLength}.`, {
                    padding: locator.range([0, sentenceLength])
                }));
            }
        }
    }
};
export default report;

