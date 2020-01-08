import { workspace, languages } from 'vscode'

const escapeStringRegexp = require('escape-string-regexp')
let config: any

export async function readConfig() {
    return config = workspace.getConfiguration('auto_set_syntax')
}

export function getConfig() {
    return config
}

export async function applySyntax(doc: any) {
    let fLine = doc.lineAt(0)

    if (!fLine.isEmptyOrWhitespace) {
        let txt = fLine.text
        let mapping = getConfig().syntax_mapping
        let find = mapping.find((obj: any) => txt.match(escapeStringRegexp(obj.first_line_pattern)))

        if (find) {
            let syntax = find.languageId

            if (!languages.match(syntax, doc)) {
                return languages.setTextDocumentLanguage(doc, syntax)
            }
        }
    }
}
