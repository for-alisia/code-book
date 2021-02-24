/** Dependencies */
import { useRef } from 'react';
/** Editor deps */
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Hightlighter from 'monaco-jsx-highlighter';

/** Styles */
import './code-editor.styles.css';
/** This CSS resets syntax highlighting (Highlighter package) */
import './syntax.css';

/** Props Model */
interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

/** Editor */
const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    /** Save the editor instance to the ref */
    editorRef.current = monacoEditor;
    /** Set listener */
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    /** Format tabs */
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    /** Set support of JSX */
    const highlighter = new Hightlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );

    /** Very specific logic from the package removing logs
     * This package is not an oficcial package (maybe it'll break at some point of time in the future)
     * (we don't want to see endless logs from this package in the console) */
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const onFormatClick = () => {
    /** Get unformatted code from the editor */
    const unformatted = editorRef.current.getModel().getValue();
    /** Format code using Prettier */
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');
    /** Set formatted code back to the editor */
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button className="button button-format is-primary is-small" onClick={onFormatClick}>
        Format
      </button>
      <MonacoEditor
        height="500px"
        value={initialValue}
        language="javascript"
        theme="dark"
        editorDidMount={onEditorDidMount}
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
