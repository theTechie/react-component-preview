'use babel'

import ReactComponentPreviewView from './react-component-preview-view'
import { CompositeDisposable } from 'atom'

export default {

    reactComponentPreviewView: null,
    previewPanel: null,
    subscriptions: null,

    activate(state) {
        this.reactComponentPreviewView = this.getView(state)

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable()

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'react-component-preview:toggle': () => this.toggle()
        }))

        // Subscribe to openFile and fileContentChange events
        this.subscriptions.add(atom.workspace.onDidOpen((e) => this.openFile(e)))
        this.subscriptions.add(atom.workspace.observeTextEditors(
            (editor) => editor.onDidStopChanging((e) => this.refreshPreview(e)))
        )
    },

    getView(state) {
        return state ? new ReactComponentPreviewView(state.reactComponentPreviewViewState) : new ReactComponentPreviewView()
    },

    isActive() {
        return this.previewPanel && this.previewPanel.alive
    },

    toggle() {
        return this.isActive() ? this.destroy() : this.splitPane()
    },

    splitPane() {
        const activePane = atom.workspace.getActivePane()
        this.reactComponentPreviewView = this.getView()

        this.previewPanel = activePane.splitRight({
            items: [this.reactComponentPreviewView.getElement()]
        })
    },

    openFile({uri, item, pane, index}) {
        if (this.isActive()) {
            console.log('dir name : ', __dirname)
            //item.saveAs(__dirname + '/component.js')
        }
    },

    refreshPreview(e) {
        if (this.isActive()) {
            console.log('refreshPreview : ', e)
        }
    },

    serialize() {
        return {
            reactComponentPreviewViewState: this.reactComponentPreviewView.serialize()
        }
    },

    destroy() {
        this.previewPanel.close()
        this.previewPanel.destroy()
    },

    deactivate() {
        this.reactComponentPreviewView.destroy()
        this.subscriptions.dispose()
    }
}
