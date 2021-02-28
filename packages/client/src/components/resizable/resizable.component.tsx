/** Dependencies */
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { useEffect, useState } from 'react';

/** Styles */
import './resizable.styles.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  /** current windows dimensions */
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  /** Start width of the ResizableBox (syncronized with the panel) */
  const [panelWidth, setPanelWidth] = useState(width * 0.5);

  /** Update the constraints of the ResizableBox on resize the browser window */
  useEffect(() => {
    let timer: any;

    /** Debounced listener (for a better perfomance) */
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        if (window.innerWidth * 0.75 < panelWidth) {
          setPanelWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };

    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [panelWidth]);

  /** Props for ResizableBox (for vertical and horizontal) */
  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      width: panelWidth,
      height: Infinity,
      resizeHandles: ['e'],
      maxConstraints: [width * 0.75, Infinity],
      minConstraints: [width * 0.2, Infinity],
      onResizeStop: (e, data) => {
        setPanelWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, height * 0.9],
      minConstraints: [Infinity, 50],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
