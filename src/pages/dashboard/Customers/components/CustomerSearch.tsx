import { Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CustomerSearch() {
  return (
    <div className='flex w-full max-w-sm items-center space-x-2 mb-8'>
      <Input type='text' placeholder='Search customers...' />
      <Button type='submit'>
        <SearchIcon className='h-4 w-4 mr-2' />
        Search
      </Button>
    </div>
  );
}
