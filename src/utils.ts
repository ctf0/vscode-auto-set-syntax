import {languages, workspace} from 'vscode'

const escapeStringRegexp = require('escape-string-regexp')
export const PACKAGE_NAME = 'autoSetSyntax'
export let config: any

export async function readConfig() {
    config = await workspace.getConfiguration(PACKAGE_NAME)
}

export async function applySyntax(doc: any) {
    let fLine = doc.lineAt(0)

    if (!fLine.isEmptyOrWhitespace) {
        let txt = fLine.text
        let mapping = config.syntaxMapping
        let find = mapping.find((obj: any) => txt.match(escapeStringRegexp(obj.first_line_pattern)))

        if (find) {
            let syntax = find.languageId

            if (!languages.match(syntax, doc)) {
                return languages.setTextDocumentLanguage(doc, syntax)
            }
        }
    }
}
