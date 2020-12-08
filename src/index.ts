import {
    ExtensionContext,
    languages,
    window,
    workspace
} from 'vscode'
import OnTypeProvider from './format_provider'
import * as utils     from './utils'

const {EOL} = require('os')

export async function activate(context: ExtensionContext) {
    await utils.readConfig()

    workspace.onDidChangeConfiguration(async (e: any) => {
        if (e.affectsConfiguration(utils.PACKAGE_NAME)) {
            await utils.readConfig()
        }
    })

    // type
    context.subscriptions.push(
        languages.registerOnTypeFormattingEditProvider(
            [
                {scheme: 'file'},
                {scheme: 'untitled'}
            ],
            new OnTypeProvider(),
            EOL
        )
    )

    // save
    workspace.onDidSaveTextDocument((doc: any) => {
        let editor = window.activeTextEditor

        if (editor && doc == editor.document && !utils.config.onType) {
            utils.applySyntax(doc)
        }
    })
}

export function deactivate() { }
