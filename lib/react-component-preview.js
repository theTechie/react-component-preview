'use babel'

import ReactComponentPreviewView from './react-component-preview-view'
import { CompositeDisposable } from 'atom'

export default {

  reactComponentPreviewView: null,
  previewPanel: null,
  subscriptions: null,

  activate(state) {
    this.reactComponentPreviewView = new ReactComponentPreviewView(state.reactComponentPreviewViewState)

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'react-component-preview:toggle': () => this.toggle()
    }))
  },

  deactivate() {
    this.previewPanel.destroy()
    this.reactComponentPreviewView.destroy()
    this.subscriptions.dispose()
  },

  serialize() {
    return {
      reactComponentPreviewViewState: this.reactComponentPreviewView.serialize()
    }
  },

  splitPane() {
    const activePane = atom.workspace.getActivePane()
    const view = new ReactComponentPreviewView()

    this.previewPanel = activePane.splitRight({
      items: [view.getElement()]
    })
  },

  toggle() {
    console.log('ReactComponentPreview was toggled!')

    return (this.previewPanel && this.previewPanel.isActive()) ? this.previewPanel.close() : this.splitPane()
  }
}
