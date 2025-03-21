import { JSX, useState } from "react";
import { Crown, Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusAvatar, { RingWidth, StatusPosition } from "@/components/StatusAvatar";

export default function AvatarStatusDemo() {
  const [ringWidth, setRingWidth] = useState<RingWidth>("medium");
  const [position, setPosition] = useState<StatusPosition>("top-right");
  const [customStatus, setCustomStatus] = useState<JSX.Element | null>(null);
  const [statusOffsetX, setStatusOffsetX] = useState<number>(0.1);
  const [statusOffsetY, setStatusOffsetY] = useState<number>(0.1);

  const handleOffsetChange = (setState: (value: (prevValue: number) => number) => void, increment: number) => {
    setState((prevValue: number) => parseFloat((prevValue + increment).toFixed(1)));
  };

  // 自定义状态示例
  const customStatusOptions = [
    {
      id: "crown",
      element: (
        <Badge className='rounded-full bg-yellow-500 p-1'>
          <Crown className='h-3 w-3' />
        </Badge>
      ),
    },
    {
      id: "heart",
      element: (
        <Badge className='rounded-full bg-red-500 p-1'>
          <Heart className='h-3 w-3' />
        </Badge>
      ),
    },
    {
      id: "star",
      element: (
        <Badge className='rounded-full bg-blue-500 p-1'>
          <Star className='h-3 w-3' />
        </Badge>
      ),
    },
  ];

  return (
    <div className='space-y-8 p-6'>
      <div className='flex flex-wrap items-end gap-6'>
        <StatusAvatar
          src='/static/logo.svg?height=200&width=200'
          alt='User 1'
          status='notification'
          statusContent={5}
          statusRingWidth={ringWidth}
          statusPosition={position}
          statusOffsetX={statusOffsetX.toString()}
          statusOffsetY={statusOffsetY.toString()}
        />

        <StatusAvatar
          src='/static/logo.svg?height=200&width=200'
          alt='User 2'
          status='online'
          statusRingWidth={ringWidth}
          statusPosition={position}
          statusOffsetX={statusOffsetX.toString()}
          statusOffsetY={statusOffsetY.toString()}
        />

        <StatusAvatar
          src='/static/logo.svg?height=200&width=200'
          alt='User 3'
          status='new'
          shape='square'
          statusRingWidth={ringWidth}
          statusPosition={position}
          statusOffsetX={statusOffsetX.toString()}
          statusOffsetY={statusOffsetY.toString()}
        />

        <StatusAvatar
          src='/static/logo.svg?height=200&width=200'
          alt='User 4'
          status='verified'
          shape='square'
          statusRingWidth={ringWidth}
          statusPosition={position}
          statusOffsetX={statusOffsetX.toString()}
          statusOffsetY={statusOffsetY.toString()}
        />

        <StatusAvatar
          src='/static/logo.svg?height=200&width=200'
          alt='User 5'
          status='alert'
          statusRingWidth={ringWidth}
          statusPosition={position}
          statusOffsetX={statusOffsetX.toString()}
          statusOffsetY={statusOffsetY.toString()}
        />

        {customStatus && (
          <StatusAvatar
            src='/static/logo.svg?height=200&width=200'
            alt='Custom'
            status='custom'
            statusContent={customStatus}
            statusRingWidth={ringWidth}
            statusPosition={position}
            statusOffsetX={statusOffsetX.toString()}
            statusOffsetY={statusOffsetY.toString()}
            statusClassName='rounded-full'
          />
        )}
      </div>

      <div className='max-w-md space-y-4 border p-4 rounded-lg'>
        <div className='space-y-2'>
          <Label>边框粗细</Label>
          <Tabs value={ringWidth} onValueChange={(value) => setRingWidth(value as RingWidth)} className='w-full'>
            <TabsList className='grid w-full grid-cols-6'>
              <TabsTrigger value='none'>无</TabsTrigger>
              <TabsTrigger value='extra-thin'>超细</TabsTrigger>
              <TabsTrigger value='thin'>细</TabsTrigger>
              <TabsTrigger value='medium'>中</TabsTrigger>
              <TabsTrigger value='thick'>粗</TabsTrigger>
              <TabsTrigger value='extra-thick'>超粗</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className='space-y-2'>
          <Label>状态位置</Label>
          <Select value={position} onValueChange={(value) => setPosition(value as StatusPosition)}>
            <SelectTrigger>
              <SelectValue placeholder='选择位置' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='top-left'>左上</SelectItem>
              <SelectItem value='top-right'>右上</SelectItem>
              <SelectItem value='bottom-left'>左下</SelectItem>
              <SelectItem value='bottom-right'>右下</SelectItem>
              <SelectItem value='custom'>自定义</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {position === "custom" && (
          <div className='space-y-2'>
            <Label>X 偏移量</Label>
            <div className='flex items-center'>
              <button
                className='p-2 border rounded-l-md hover:bg-gray-100'
                onClick={() => handleOffsetChange(setStatusOffsetX, -0.5)}
              >
                -
              </button>
              <input
                type='text'
                value={statusOffsetX}
                onChange={(e) => setStatusOffsetX(parseFloat(e.target.value))}
                className='border-t border-b border-r p-2 w-full text-center'
                placeholder='例如: 10px'
              />
              <button
                className='p-2 border rounded-r-md hover:bg-gray-100'
                onClick={() => handleOffsetChange(setStatusOffsetX, 0.5)}
              >
                +
              </button>
            </div>

            <Label>Y 偏移量</Label>
            <div className='flex items-center'>
              <button
                className='p-2 border rounded-l-md hover:bg-gray-100'
                onClick={() => handleOffsetChange(setStatusOffsetY, -0.5)}
              >
                -
              </button>
              <input
                type='text'
                value={statusOffsetY}
                onChange={(e) => setStatusOffsetY(parseFloat(e.target.value))}
                className='border-t border-b border-r p-2 w-full text-center'
                placeholder='例如: 10px'
              />
              <button
                className='p-2 border rounded-r-md hover:bg-gray-100'
                onClick={() => handleOffsetChange(setStatusOffsetY, 0.5)}
              >
                +
              </button>
            </div>
          </div>
        )}
        <div className='space-y-2'>
          <Label>自定义状态</Label>
          <div className='flex gap-2'>
            {customStatusOptions.map((option) => (
              <button
                key={option.id}
                className='p-2 border rounded-md hover:bg-gray-100'
                onClick={() => setCustomStatus(option.element)}
              >
                {option.element}
              </button>
            ))}
            <button className='p-2 border rounded-md hover:bg-gray-100' onClick={() => setCustomStatus(null)}>
              清除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
