import {
    OnTypeFormattingEditProvider,
    Position,
    TextDocument,
    TextEdit,
    workspace
} from 'vscode'
import * as utils from './utils'

export default class OnTypeProvider implements OnTypeFormattingEditProvider {

    config: any

    constructor() {
        this.config = utils.config

        workspace.onDidChangeConfiguration((e) => {
            if (e.affectsConfiguration(utils.PACKAGE_NAME)) {
                this.config = utils.config
            }
        })
    }

    async provideOnTypeFormattingEdits(
        document: TextDocument,
        position: Position
    ): Promise<TextEdit[]> {
        if (position.line == 1 && this.config.onType) {
            await utils.applySyntax(document)
        }

        return []
    }
}
