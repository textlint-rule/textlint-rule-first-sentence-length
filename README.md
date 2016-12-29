# textlint-rule-first-sentence-length

textlint rule that limit maximum length of **First** sentence of the section.

Related: [textlint-rule-sentence-length](https://github.com/azu/textlint-rule-sentence-length "textlint-rule-sentence-length")

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-first-sentence-length

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "first-sentence-length": true
    }
}
```

Via CLI

```
textlint --rule first-sentence-length README.md
```

## Options

- `max`
    - default: 50
    - The total number of characters allowed on **first** paragraph of the sentence.
    - Fist sentence.length should be <= 50.

```
{
    "rules": {
        "sentence-length": {
            "max": 50
        }
    }
}
```

## Related rule

- [textlint-rule-sentence-length](https://github.com/azu/textlint-rule-sentence-length "textlint-rule-sentence-length")
    - lint each sentence length.

## Reference

> 書き出しの文は30字以下  
>
> 書き出しの長さは、文全体が一目で見られる目安として「30字」と定めました。興味を引き、一気に読んでもらえるかは、書き出し文の印象にかかっています。

- [文書作成術 --- 文章を上品に磨く15の心得](http://www.motorwarp.com/koizumi/writingstyle01.html "文書作成術 --- 文章を上品に磨く15の心得")

## Changelog

See [Releases page](https://github.com/azu/textlint-rule-first-sentence-length/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/textlint-rule-first-sentence-length/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
