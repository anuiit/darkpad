import React, { useState } from 'react';
import { AArrowDown, AArrowUp } from 'lucide-react';
import { Button } from './button';

export const FontSizeController = ({ fontSize, setFontSize }) => {
  // Function to increase font size
  const handleIncreaseFontSize = () => {
    setFontSize((prevFontSize) => prevFontSize + 8);
  };

  // Function to decrease font size
  const handleDecreaseFontSize = () => {
    setFontSize((prevFontSize) => Math.max(prevFontSize - 8, 10));
  };

  return (
    <div className="mx-4 mt-2 mb-2">
      <Button onClick={handleIncreaseFontSize} variant="outline" className="mr-2" size="test_sm">
        <AArrowUp />
      </Button>
      <Button onClick={handleDecreaseFontSize} variant="outline" size="test_sm">
        <AArrowDown />
      </Button>
    </div>
  );
};

export const ResizableTextarea = React.forwardRef(({ className, fontSize, onChange, ...props }, ref) => {
  // Add state to manage the textarea's value
  const [text, setText] = useState('');

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'z') {
      undoChanges(); // Placeholder function for undo
      event.preventDefault(); // Prevent the default undo functionality
    } else if (event.key === 'Tab') {
      insertTab(event); // Function to handle Tab insertion
      event.preventDefault(); // Prevent moving to the next focusable element
    }
  };

  // Placeholder for undo functionality
  const undoChanges = () => {
    console.log("Undo functionality goes here");
    // Implement your undo logic
  };

  // Function to insert a tab when the Tab key is pressed
  const insertTab = (event) => {
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;

    // Update the textarea's value to include a tab character at the current cursor position
    setText(currentText => currentText.substring(0, start) + "\t" + currentText.substring(end));

    // Need to defer setting selection, because setText does not immediately update the text
    setTimeout(() => {
      event.target.selectionStart = event.target.selectionEnd = start + 1;
    }, 0);
  };

  // Update handle change to use setText
  const handleChange = (value) => {
    setText(value);
    if (onChange) onChange(value);
  };

  return (
    <textarea
      className={`resize-none h-full bg-background outline-none scrollbar scrollbar-thumb-blue scrollbar-thin ${className}`}
      style={{ fontSize: `${fontSize}px` }}
      ref={ref}
      value={text} // Controlled component
      onChange={(e) => handleChange(e.target.value)}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
});

ResizableTextarea.displayName = "ResizableTextarea";
