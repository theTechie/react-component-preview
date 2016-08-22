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
    },

    getView(state) {
        return state ? new ReactComponentPreviewView(state.reactComponentPreviewViewState) : new ReactComponentPreviewView()
    },

    toggle() {
        console.log('ReactComponentPreview was toggled!')

        return (this.previewPanel && this.previewPanel.isActive()) ? this.previewPanel.close() : this.splitPane()
    },

    splitPane() {
        const activePane = atom.workspace.getActivePane()
        this.reactComponentPreviewView = this.getView()

        this.previewPanel = activePane.splitRight({
            items: [this.reactComponentPreviewView.getElement()]
        })
    },

    serialize() {
        return {
            reactComponentPreviewViewState: this.reactComponentPreviewView.serialize()
        }
    },

    deactivate() {
        this.previewPanel.destroy()
        this.reactComponentPreviewView.destroy()
        this.subscriptions.dispose()
    }
}
