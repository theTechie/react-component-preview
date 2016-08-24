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

        // Subscribe to onDidStopChangingActivePaneItem
        this.subscriptions.add(atom.workspace.onDidStopChangingActivePaneItem((item) => this.activeFileChanged(item)))
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
        return this.isActive() ? this.destroy() : this.splitPane()
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
            //item.saveAs(__dirname + '/component.js')
        } else {
            this.isActive() && this.previewPanel.close()
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
        this.previewPanel = null
    },

    deactivate() {
        this.reactComponentPreviewView.destroy()
        this.subscriptions.dispose()
    }
}
