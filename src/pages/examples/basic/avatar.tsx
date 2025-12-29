import { useState } from "react";
import { Crown, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusAvatar, { RingWidth, StatusPosition, Size, StatusType } from "@/components/StatusAvatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const ALL_STATUSES: StatusType[] = ["online", "notification", "new", "verified", "alert"];
const ALL_SIZES: Size[] = ["xs", "sm", "md", "lg", "xl"];

export default function AvatarStatusDemo() {
  const [ringWidth, setRingWidth] = useState<RingWidth>("medium");
  const [ringColor, setRingColor] = useState<string>("ring-white");
  const [position, setPosition] = useState<StatusPosition>("top-right");
  const [statusOffsetX, setStatusOffsetX] = useState<string>("0px");
  const [statusOffsetY, setStatusOffsetY] = useState<string>("0px");
  const [shape, setShape] = useState<"circle" | "square" | "rounded-square">("circle");
  const [useBorderSync, setUseBorderSync] = useState<boolean>(true);

  const handleOffsetChange = (setter: React.Dispatch<React.SetStateAction<string>>, increment: number) => {
    setter((prev) => `${parseInt(prev, 10) + increment}px`);
  };

  return (
    <div className='space-y-8 p-6'>
      <Card>
        <CardHeader>
          <CardTitle>Image Avatars with Status</CardTitle>
          <CardDescription>Demonstrates different statuses on a standard image avatar with new shape support and smart badge adaptation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {ALL_SIZES.map((s) => (
            <div key={s} className="space-y-3">
              <Label className="text-lg font-semibold capitalize">{s} Size</Label>
              <div className='flex flex-wrap items-end gap-8'>
                {ALL_STATUSES.map((status) => (
                  <div key={status} className="flex flex-col items-center gap-2">
                    <StatusAvatar
                      src='/static/logo.svg'
                      alt={`User - ${status}`}
                      size={s}
                      shape={shape}
                      status={status}
                      statusContent={status === 'notification' ? 5 : undefined}
                      statusBorderStyle={{
                        width: ringWidth,
                        color: ringColor
                      }}
                      statusPosition={position}
                      statusOffsetX={statusOffsetX}
                      statusOffsetY={statusOffsetY}
                    />
                    <span className="text-xs text-muted-foreground">{status}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Icon Avatars with Status</CardTitle>
          <CardDescription>Demonstrates using an icon as the main avatar content, with synchronized borders and smart shape adaptation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           <div className='flex flex-wrap items-end gap-8'>
              <StatusAvatar size="lg" shape={shape} status="online" statusBorderStyle={{ width: ringWidth, color: ringColor }} statusPosition={position}><Crown className="h-full w-full text-yellow-500" /></StatusAvatar>
              <StatusAvatar size="lg" shape={shape} status="notification" statusContent={9} statusBorderStyle={{ width: ringWidth, color: ringColor }} statusPosition={position}><Heart className="h-full w-full text-red-500" /></StatusAvatar>
              <StatusAvatar size="lg" shape={shape} status="verified" statusBorderStyle={{ width: ringWidth, color: ringColor }} statusPosition={position}><Star className="h-full w-full text-blue-500" /></StatusAvatar>
           </div>
        </CardContent>
      </Card>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Controls</CardTitle>
          <CardDescription>Dynamically change the properties of the avatars above. Test new features including shape support and smart badge adaptation.</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label>Avatar Shape</Label>
            <Tabs value={shape} onValueChange={(value) => setShape(value as "circle" | "square" | "rounded-square")} className='w-full'>
              <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger value='circle'>Circle</TabsTrigger>
                <TabsTrigger value='square'>Square</TabsTrigger>
                <TabsTrigger value='rounded-square'>Rounded</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className='space-y-2'>
            <Label>Status Indicator Border Width</Label>
            <Tabs value={ringWidth} onValueChange={(value) => setRingWidth(value as RingWidth)} className='w-full'>
              <TabsList className='grid w-full grid-cols-6'>
                <TabsTrigger value='none'>None</TabsTrigger>
                <TabsTrigger value='extra-thin'>XS</TabsTrigger>
                <TabsTrigger value='thin'>S</TabsTrigger>
                <TabsTrigger value='medium'>M</TabsTrigger>
                <TabsTrigger value='thick'>L</TabsTrigger>
                <TabsTrigger value='extra-thick'>XL</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className='space-y-2'>
            <Label>Border Color</Label>
            <div className="flex gap-2">
              <Button onClick={() => setRingColor("ring-white")}>White</Button>
              <Button onClick={() => setRingColor("ring-black")}>Black</Button>
              <Button onClick={() => setRingColor("ring-blue-500")}>Blue</Button>
            </div>
          </div>

          <div className='space-y-2'>
            <Label>Status Position</Label>
            <Select value={position} onValueChange={(value) => setPosition(value as StatusPosition)}>
              <SelectTrigger><SelectValue placeholder='Select position' /></SelectTrigger>
              <SelectContent>
                <SelectItem value='top-left'>Top Left</SelectItem>
                <SelectItem value='top-right'>Top Right</SelectItem>
                <SelectItem value='bottom-left'>Bottom Left</SelectItem>
                <SelectItem value='bottom-right'>Bottom Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className='space-y-2'>
            <Label>Custom Offset</Label>
            <div className="flex gap-4">
              <div className='flex items-center w-full'>
                <span className="mr-2">X:</span>
                <button className='p-2 border rounded-l-md hover:bg-gray-100' onClick={() => handleOffsetChange(setStatusOffsetX, -5)}>-</button>
                <input type='text' value={statusOffsetX} onChange={(e) => setStatusOffsetX(e.target.value)} className='border-t border-b p-2 w-full text-center' placeholder='e.g., 10px' />
                <button className='p-2 border rounded-r-md hover:bg-gray-100' onClick={() => handleOffsetChange(setStatusOffsetX, 5)}>+</button>
              </div>
              <div className='flex items-center w-full'>
                <span className="mr-2">Y:</span>
                <button className='p-2 border rounded-l-md hover:bg-gray-100' onClick={() => handleOffsetChange(setStatusOffsetY, -5)}>-</button>
                <input type='text' value={statusOffsetY} onChange={(e) => setStatusOffsetY(e.target.value)} className='border-t border-b p-2 w-full text-center' placeholder='e.g., -10px' />
                <button className='p-2 border rounded-r-md hover:bg-gray-100' onClick={() => handleOffsetChange(setStatusOffsetY, 5)}>+</button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
