import React, { useState } from 'react';
import { AArrowDown, AArrowUp } from 'lucide-react';
import { Button } from './ui/button';
import StreamedResponseComponent from './streamed-response';

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

  async function getStreamingResponse(query) {
    const response = await fetch('http://localhost:8000/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let isFirstChunk = true;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      let chunk = decoder.decode(value);
      if (isFirstChunk) {
        chunk = chunk.trimStart(); // Remove leading whitespace from the first chunk
        isFirstChunk = false;
      }
      setText((prevText) => prevText + chunk);
    }
  }
  const handleCommand = async (e) => {
    if (e.key === 'Enter') {
      const cursorPosition = e.target.selectionStart;
      const textBeforeCursor = e.target.value.substring(0, cursorPosition);
      const lineBeforeCursor = textBeforeCursor.split('\n').pop();

      console.log(cursorPosition, textBeforeCursor, lineBeforeCursor)
      if (lineBeforeCursor.startsWith('/ai')) {
        const query = lineBeforeCursor.slice(3).trim();
        console.log(query)
        await getStreamingResponse(query);
      }
    }
  };

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

  const handleKeyDownEvent = (event) => {
    handleKeyDown(event);
    handleCommand(event);
  };

  return (
    <textarea
      className={`resize-none h-full bg-background outline-none scrollbar scrollbar-thumb-blue scrollbar-thin ${className}`}
      style={{ fontSize: `${fontSize}px` }}
      ref={ref}
      value={text} // Controlled component
      onChange={(e) => handleChange(e.target.value)}
      onKeyDown={handleKeyDownEvent}
      {...props}
    />
  );
});

ResizableTextarea.displayName = "ResizableTextarea";
