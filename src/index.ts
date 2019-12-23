import { workspace, languages } from 'vscode'
const escapeStringRegexp = require('escape-string-regexp')
let config: any

export function activate() {
    readConfig()

    workspace.onDidChangeConfiguration((e: any) => {
        if (e.affectsConfiguration) {
            readConfig()
        }
    })

    workspace.onDidSaveTextDocument((doc: any) => applySyntax(doc))
}

function readConfig() {
    return config = workspace.getConfiguration('auto_set_syntax')
}

function applySyntax(doc: any) {
    let fLine = doc.lineAt(0)

    if (!fLine.isEmptyOrWhitespace) {
        let txt = fLine.text
        let mapping = config.syntax_mapping
        let find = mapping.find((obj: any) => txt.match(escapeStringRegexp(obj.first_line_pattern)))

        if (find) {
            let syntax = find.languageId

            if (!languages.match(syntax, doc)) {
                return languages.setTextDocumentLanguage(doc, syntax)
            }
        }
    }
}

export function deactivate() {
    //
}
