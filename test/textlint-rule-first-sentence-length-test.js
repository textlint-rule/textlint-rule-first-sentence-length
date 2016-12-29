// MIT © 2016 azu
"use strict";
const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../src/textlint-rule-first-sentence-length");
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
                    message: `Line 2 exceeds the maximum sentence length of ${options.max}.
First sentence should be short.`,
                    line: 2,
                    column: 1
                }
            ]
        },
        // multiple match
        {
            text: `# Header1
It is long text.

## Header 2

It is very long.
"`,
            options,
            errors: [
                {
                    message: `Line 2 exceeds the maximum sentence length of ${options.max}.
First sentence should be short.`,
                    line: 2,
                    column: 1
                },
                {
                    message: `Line 6 exceeds the maximum sentence length of ${options.max}.
First sentence should be short.`,
                    line: 6,
                    column: 1
                }
            ]
        },

    ]
});