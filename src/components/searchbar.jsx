import React from 'react';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { Button } from "./ui/button";


const SearchBar = () => {
  return (
    <div className='relative'>
        <Input/>
        <Button size="test_sm" variant="outline" className='absolute left-1 top-1/2 transform -translate-y-1/2'>
            <Search size={16}/>
        </Button>
    </div>
  );
};

export default SearchBar;


