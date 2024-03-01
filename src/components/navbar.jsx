// navbar 

import React from 'react';
import { SearchIcon, PlusIcon, SaveIcon, TrashIcon } from './ui/icons';
import { Save } from 'lucide-react';
import { Button } from './ui/button';
import { ModeToggle } from './ui/toggle-mode';

export default function Navbar() {
    return (
        <div className='flex w-full h-16 items-center'>
            <div className='flex items-center ml-4'>
                <ModeToggle />
                <span className='ml-4'>Home</span>
            </div>
            
            <div className='flex flex-auto justify-end mr-4'>
            </div>
            <div className='flex justify-between items-center w-56'>
                <Button variant='outline' className="px-2">
                    <SearchIcon />
                </Button>
                <Button variant='outline' className="px-2">
                    <PlusIcon />
                    </Button>
                <Button variant='outline' className="px-2">
                    <SaveIcon />
                    </Button>
                <Button variant='outline' className="mr-4 px-2">
                    <TrashIcon />
                </Button>
            </div>
        </div>
    );
}

function iconsPosition() {

}