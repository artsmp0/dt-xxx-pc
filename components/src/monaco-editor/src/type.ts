import type { editor } from 'monaco-editor'

export interface AtMonacoEditorProps {
  options?: editor.IStandaloneEditorConstructionOptions
  defaultValue?: string
  value?: string
}
