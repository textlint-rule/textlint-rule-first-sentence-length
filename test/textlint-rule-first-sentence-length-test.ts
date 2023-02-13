// MIT © 2016 azu
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/textlint-rule-first-sentence-length";

const tester = new TextLintTester();
const options = {
    max: 5
};
tester.run("rule", rule, {
    valid: [
        // no problem
        "text",
        {
            text: `# Header
1st.
It is long text."`,
            options
        }
    ],
    invalid: [
        // single match
        {
            text: `# Header
It is long text."`,
            options,
            errors: [
                {
                    message: `First sentence should be short.
                
The first sentence exceeds the maximum sentence length of ${options.max}.`,
                    loc: {
                        start: {
                            line: 2,
                            column: 1
                        },
                        end: {
                            line: 2,
                            column: 18
                        }
                    }
                }
            ]
        },
        // multiple match
        {
            text: `# Header1
It is long text.

## Header 2

It is very long.
`,
            options,
            errors: [
                {
                    message: `First sentence should be short.
                
The first sentence exceeds the maximum sentence length of ${options.max}.`,
                    range: [
                        10,
                        26
                    ]
                },
                {
                    message: `First sentence should be short.
                
The first sentence exceeds the maximum sentence length of ${options.max}.`,
                    range: [
                        41,
                        57
                    ]
                }
            ]
        },

    ]
});
