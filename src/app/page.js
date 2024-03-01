'use client';

import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri'
import Navbar from '@/components/navbar';
import { Separator } from '@/components/ui/separator';
import TextAreaParent from '@/components/textarea-parent';

export default function Home() {
  const [text, setText] = useState('');
  
  const openFile = async () => {
    // Open file dialog and read file content, then set it as text
    const filePath = "path/to/open"; // This should be replaced with a file picker
    const content = await invoke('open_file', { path: filePath });
    setText(content);
  };

  const saveFile = async () => {
    // Save the current text to a file
    const filePath = "path/to/save"; // This should be replaced with a file picker
    await invoke('save_file', { path: filePath, contents: text });
  };

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'z') {
      undoChanges(); // Placeholder function for undo
      event.preventDefault(); // Prevent the default undo functionality
    } else if (event.ctrlKey && event.key === 's') {
      saveFile(); // Use your existing save logic
      event.preventDefault(); // Prevent the default save functionality
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

    // Set textarea value to: text before caret + tab + text after caret
    setText(text.substring(0, start) + "\t" + text.substring(end));

    // Put caret at right position again
    event.target.selectionStart = event.target.selectionEnd = start + 1;
  };

  return (
    <div className='flex flex-col h-screen'>
      <Navbar/>
      <Separator/>
      <div className='flex-grow'>
        <TextAreaParent 
          value={text} 
          onChange={(e) => {setText(e.target.value); handleAdjustHeight(e)}}
          onKeyDown={handleKeyDown} // Corrected to use value
        />
      </div>
    </div>
  );
}