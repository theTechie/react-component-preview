'use babel'

import ReactComponentPreviewView from './react-component-preview-view'
import { CompositeDisposable, BufferedProcess } from 'atom'
import path from 'path'

export default {

    reactComponentPreviewView: null,
    previewPanel: null,
    subscriptions: null,
    process: null,
    currentFilePath: null,

    activate(state) {
        this.reactComponentPreviewView = this.getView(state)

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable()

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'react-component-preview:toggle': () => this.toggle()
        }))

        // Subscribe to onDidStopChangingActivePaneItem
        this.subscriptions.add(atom.workspace.onDidStopChangingActivePaneItem((item) => this.activeFileChanged(item)))
        this.subscriptions.add(atom.workspace.onWillDestroyPane((e) => this.beforePaneDestory(e)))
    },

    getView(state) {
        return state ? new ReactComponentPreviewView(state.reactComponentPreviewViewState) : new ReactComponentPreviewView()
    },

    canPreview() {
        return atom.workspace.getActiveTextEditor()
    },

    isActive() {
        return this.previewPanel && this.previewPanel.alive
    },

    toggle() {
        return this.isActive() ? this.destroy() : this.startDevServer()
    },

    splitPane() {
        if (this.canPreview()) {
            const activePane = atom.workspace.getActivePane()
            this.reactComponentPreviewView = this.getView()

            this.previewPanel = activePane.splitRight({
                items: [this.reactComponentPreviewView.getElement()]
            })

            activePane.activate()
        }
    },

    activeFileChanged(item) {
        const activeTextEditor = atom.workspace.getActiveTextEditor()

        if (item && item === activeTextEditor) {
            console.log('file path : ', item.getPath())
            if (item.getPath() !== this.currentFilePath) {
                this.startDevServer()
            }
        } else {
            this.isActive() && this.previewPanel.close()
        }
    },

    startDevServer() {
        if (this.canPreview()) {
            const packageDir = path.join(__dirname, '..')
            const activeTextEditor = atom.workspace.getActiveTextEditor()
            this.currentFilePath = activeTextEditor && activeTextEditor.getPath()
            const sourcePath = path.resolve(this.currentFilePath)

            const server = path.join(packageDir, 'server.js')

            this.isActive() && this.destroy()

            // start dev server
            this.process = new BufferedProcess({
                command: 'node',
                args: [server, this.currentFilePath, sourcePath],
                options: {
                    cwd: packageDir
                },
                stdout: (output) => {
                    console.log('proc out: ', output)
                    if (output.indexOf('now VALID') !== -1) {
                        !this.isActive() && this.splitPane()
                    }
                }.bind(this),
                stderr: (error) => {
                    console.log('proc error: ', error)
                    this.process.kill()
                },
                exit: (exitCode) => console.log('proc exit: ', exitCode)
            })
        }
    },

    beforePaneDestory(e) {
        this.process.kill()
    },

    serialize() {
        return {
            reactComponentPreviewViewState: this.reactComponentPreviewView.serialize()
        }
    },

    destroy() {
        this.previewPanel.close()
        this.previewPanel.destroy()
        this.previewPanel = null
        this.process && this.process.kill()
    },

    deactivate() {
        this.reactComponentPreviewView.destroy()
        this.subscriptions.dispose()
    }
}
