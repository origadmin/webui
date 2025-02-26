import { useState } from "react";
import { iconsList, dynamicImports } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import TablerIcon from "@/components/IconPicker/tabler-icon";

// This is a simplified list of pickerIcons. In a real application, you'd have a more comprehensive list.
// const pickerIcons = iconsList.default;
const pickerIcons = iconsList.default || [];

type IconPickerProps = {
  value: string;
  onChange: (value: string) => void;
};

function IconPicker({ value, onChange }: IconPickerProps) {
  const [search, setSearch] = useState("");

  console.log("iconsList", iconsList.default);

  const filteredIcons = pickerIcons.filter((icon) => icon.includes(search));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='w-[200px] justify-start'>
          {value ? (
            <>
              <span className='material-icons mr-2'>{value}</span>
              {value}
            </>
          ) : (
            "Select icon"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Input
          placeholder='Search icons...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='border-b rounded-t-lg rounded-b-none focus:ring-0'
        />
        <ScrollArea className='h-[200px]'>
          <div className='grid grid-cols-3 gap-2 p-2'>
            {filteredIcons.map((icon) => {
              return (
                <Button key={icon} variant='ghost' className='h-10 w-10 p-0' onClick={() => onChange(icon)}>
                  <span className='material-icons'>
                    <TablerIcon name={icon} />
                  </span>
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

export type { IconPickerProps };
export { IconPicker };
