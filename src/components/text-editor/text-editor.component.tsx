/** Dependencies */
import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

/** Styles */
import './text-editor.styles.css';
/** Models */
import { Cell } from '../../state';
/** Redux */
import { useActions } from '../../hooks/use-actions.hook';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell: { id, content } }) => {
  /** Mode of dispalying */
  const [editing, setEditing] = useState(false);
  /** Action to update the cell */
  const { updateCell } = useActions();

  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (editorRef.current && e.target && editorRef.current.contains(e.target as Node)) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => document.removeEventListener('click', listener, { capture: true });
  }, []);
  return (
    <div>
      {editing ? (
        <div ref={editorRef} className="text-editor">
          <MDEditor value={content} onChange={(v) => updateCell(id, v || '')} />
        </div>
      ) : (
        <div onClick={() => setEditing(true)} className="text-editor card">
          <div className="card-content">
            <MDEditor.Markdown source={content || 'Click to edit'} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
