import React from 'react';
import { FontSizeController, ResizableTextarea } from './textarea'; // replace with actual file name
import { Separator } from './ui/separator'; // replace with actual file name

const TextAreaParent = () => {
  const [fontSize, setFontSize] = React.useState(48); // Default font size
    
  return (
    <div className="flex flex-col h-full">
      <FontSizeController fontSize={fontSize} setFontSize={setFontSize} />
      <Separator />
      <ResizableTextarea fontSize={fontSize} />
    </div>
  );
};

export default TextAreaParent;