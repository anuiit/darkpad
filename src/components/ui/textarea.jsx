import * as React from "react";

// In textarea.jsx
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  const [fontSize, setFontSize] = React.useState(16); // Default font size

  const handleIncreaseFontSize = () => {
    setFontSize((prevFontSize) => prevFontSize + 8);
  };

  const handleDecreaseFontSize = () => {
    setFontSize((prevFontSize) => Math.max(prevFontSize - 8, 10)); // Prevents font size from being too small
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const start = event.target.selectionStart;
      const end = event.target.selectionEnd;
      const indentationSize = 8; // Change this to your desired indentation size
      const indentation = ' '.repeat(indentationSize);
  
      // set textarea value to: text before caret + indentation + text after caret
      event.target.value = event.target.value.substring(0, start)
        + indentation
        + event.target.value.substring(end);
  
      // put caret at right position again
      event.target.selectionStart = event.target.selectionEnd = start + indentationSize;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-2">
        <button onClick={handleIncreaseFontSize} className="mr-2">Increase Font Size</button>
        <button onClick={handleDecreaseFontSize}>Decrease Font Size</button>
      </div>
      <textarea
        className={`flex-1 resize-none rounded-md bg-background px-3 py-2 outline-none ${className}`}
        style={{ fontSize: `${fontSize}px` }}
        ref={ref}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </div>
  );
});
Textarea.displayName = "Textarea";


export { Textarea };
