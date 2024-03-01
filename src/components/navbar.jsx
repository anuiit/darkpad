// navbar 

import React from 'react';
import { Save, Search, Trash, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { ModeToggle } from './ui/toggle-mode';
import SearchBar from './searchbar';

export default function Navbar() {
    return (
        <div className='flex w-full items-center justify-between h-16 px-4'>
            <div className='flex items-center'>
                <ModeToggle />
                <span className='ml-4'>Home</span>
            </div>
            
            <div className='flex justify-center w-3/4'>
                <div className='w-96'>
                    <SearchBar className=""/>
                </div>
            </div>

            <div className='flex justify-between items-center w-32'>
                <Button variant='outline' className="px-2">
                    <Plus />
                </Button>
                <Button variant='outline' className="px-2">
                    <Save />
                </Button>
                <Button variant='outline' className="px-2">
                    <Trash />
                </Button>
            </div>
        </div>
    );
}