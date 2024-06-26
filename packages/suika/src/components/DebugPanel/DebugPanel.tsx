import { type SuikaGraphics } from '@suika/core';
import { type FC, useContext, useEffect, useState } from 'react';

import { EditorContext } from '../../context';

export const DebugPanel: FC = () => {
  const editor = useContext(EditorContext);

  const [isSelectedBoxHover, setIsSelectedBoxHover] = useState(false);
  const [hoveredGraphName, setHoveredGraphName] = useState('');

  useEffect(() => {
    if (!editor) return;

    const handleSelectedBoxHover = (isHover: boolean) => {
      setIsSelectedBoxHover(isHover);
    };
    editor.selectedBox.on('hoverChange', handleSelectedBoxHover);

    const handleHoverItemChange = (hoveredItem: SuikaGraphics | null) => {
      setHoveredGraphName(hoveredItem?.attrs?.objectName ?? '');
    };
    editor.selectedElements.on('hoverItemChange', handleHoverItemChange);

    return () => {
      editor.selectedBox.off('hoverChange', handleSelectedBoxHover);
      editor.selectedElements.off('hoverItemChange', handleHoverItemChange);
    };
  }, [editor]);

  return (
    <div style={{ padding: 8 }}>
      <div>isSelectedBoxHover: {isSelectedBoxHover ? 'true' : 'false'}</div>
      <div>hoveredGraphName: {hoveredGraphName}</div>
    </div>
  );
};
