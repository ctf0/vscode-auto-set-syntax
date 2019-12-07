auto set syntax based on first line content, similar to https://github.com/jfcherng/Sublime-AutoSetSyntax

## Usage

- create a new file
- add something to the first line ex.`<?php`
- save file "syntax/language is applied automatically"

## Config

- for syntax check https://code.visualstudio.com/docs/languages/identifiers

```json
"auto_set_syntax.syntax_mapping": [
    {
        "first_line_pattern": "<?php",
        "languageId": "php"
    }
]
```
