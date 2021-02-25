/** Dependencies */
import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

/** Styles */
import './text-editor.styles.css';

const TextEditor: React.FC = () => {
  /** Mode of dispalying */
  const [editing, setEditing] = useState(false);
  /** Value of editor */
  const [value, setValue] = useState('# Header');

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
          <MDEditor value={value} onChange={(v) => setValue(v || '')} />
        </div>
      ) : (
        <div onClick={() => setEditing(true)} className="text-editor card">
          <div className="card-content">
            <MDEditor.Markdown source={value} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
