/** Dependencies */
import { useEffect, useRef } from 'react';

/** Styles */
import './preview.styles.css';

interface PreviewProps {
  code: string;
}

const html = `
    <html>
      <head>
        <style>html { background-color: white}</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector("#root");
              root.innerHTML='<div style="color: red;"><h4>Runtime error:</h4>' + err + '</div>';
              console.error(err) ;
            }
          }, false)
        </script>
      </body>
    </html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    /** Reset initial frame content */
    iframe.current.srcdoc = html;

    iframe.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe ref={iframe} srcDoc={html} title="code-frame" sandbox="allow-scripts" />
    </div>
  );
};

export default Preview;
