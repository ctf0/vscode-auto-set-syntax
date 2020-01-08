import { OnTypeFormattingEditProvider, TextDocument, workspace, TextEdit, Position } from 'vscode'
import * as utils from "./utils"

export default class OnTypeProvider implements OnTypeFormattingEditProvider {

    config: any

    constructor() {
        this.config = utils.getConfig()

        workspace.onDidChangeConfiguration((e) => {
            if (e.affectsConfiguration('auto_set_syntax')) {
                this.config = utils.getConfig()
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
