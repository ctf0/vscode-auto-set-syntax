import { window, workspace, languages, ExtensionContext } from 'vscode'
import OnTypeProvider from "./format_provider"
import * as utils from "./utils"

const { EOL } = require('os')

export function activate(context: ExtensionContext) {
    utils.readConfig()

    workspace.onDidChangeConfiguration((e: any) => {
        if (e.affectsConfiguration('auto_set_syntax')) {
            utils.readConfig()
        }
    })

    // type
    context.subscriptions.push(
        languages.registerOnTypeFormattingEditProvider(
            [
                { scheme: 'file' },
                { scheme: 'untitled' }
            ],
            new OnTypeProvider(),
            EOL
        )
    )

    // save
    workspace.onDidSaveTextDocument((doc: any) => {
        let editor = window.activeTextEditor

        if (editor && doc == editor.document) {
            utils.applySyntax(doc)
        }
    })
}

export function deactivate() { }
