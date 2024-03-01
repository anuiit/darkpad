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

  return (
    <div className='flex flex-col h-screen'>
      <Navbar/>
      <Separator/>
      <div className='flex-grow'>
        <TextAreaParent />
      </div>
    </div>
  );
}