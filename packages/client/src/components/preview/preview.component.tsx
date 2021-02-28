/** Dependencies */
import { useEffect, useRef } from 'react';

/** Styles */
import './preview.styles.css';

interface PreviewProps {
  code: string;
  bundleStatus: string;
}

const html = `
    <html>
      <head>
        <style>html { background-color: white}</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector("#root");
            root.innerHTML='<div style="color: firebrick;"><h4>Runtime error:</h4>' + err + '</div>';
            console.error(err) ;
          };
          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);
            }
          }, false)
        </script>
      </body>
    </html>
`;

const Preview: React.FC<PreviewProps> = ({ code, bundleStatus }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    /** Reset initial frame content */
    iframe.current.srcdoc = html;
    /** Set a little timeout to post a message to iframe for browser to update srcdoc */
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe ref={iframe} srcDoc={html} title="code-frame" sandbox="allow-scripts" />
      {bundleStatus && (
        <div className="preview-error">
          <h4>Bundle error:</h4>
          {bundleStatus}
        </div>
      )}
    </div>
  );
};

export default Preview;
