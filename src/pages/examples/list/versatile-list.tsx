import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListItem, listItems } from "./data";

type ViewType = "card" | "basic" | "table";

export default function VersatileList() {
  const [view, setView] = useState<ViewType>("card");

  return (
    <div className='container mx-auto py-10'>
      <Tabs value={view} onValueChange={(value) => setView(value as ViewType)}>
        <TabsList>
          <TabsTrigger value='card'>Card View</TabsTrigger>
          <TabsTrigger value='basic'>Basic View</TabsTrigger>
          <TabsTrigger value='table'>Table View</TabsTrigger>
        </TabsList>
        <TabsContent value='card'>
          <CardView items={listItems} />
        </TabsContent>
        <TabsContent value='basic'>
          <BasicView items={listItems} />
        </TabsContent>
        <TabsContent value='table'>
          <TableView items={listItems} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CardView({ items }: { items: ListItem[] }) {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='mb-4 text-sm text-gray-500'>{item.description}</p>
            <div className='mb-2 flex items-center justify-between'>
              <span className='text-sm font-medium'>Progress</span>
              <span className='text-sm font-medium'>{item.progress}%</span>
            </div>
            <Progress value={item.progress} className='w-full' />
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Badge variant={item.status === "active" ? "default" : "secondary"}>{item.status}</Badge>
            <Button variant='outline'>View Details</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function BasicView({ items }: { items: ListItem[] }) {
  return (
    <div className='space-y-6'>
      {items.map((item) => (
        <div key={item.id} className='flex items-center justify-between rounded-lg bg-white p-6 shadow'>
          <div>
            <h3 className='text-lg font-medium'>{item.title}</h3>
            <p className='text-sm text-gray-500'>{item.description}</p>
            <div className='mt-2'>
              <Badge variant={item.status === "active" ? "default" : "secondary"}>{item.status}</Badge>
            </div>
          </div>
          <div className='text-right'>
            <p className='text-sm text-gray-500'>Owner: {item.owner}</p>
            <p className='text-sm text-gray-500'>Created: {item.createdAt}</p>
            <Button variant='outline' className='mt-2'>
              View Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function TableView({ items }: { items: ListItem[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className='font-medium'>{item.title}</TableCell>
            <TableCell>
              <Badge variant={item.status === "active" ? "default" : "secondary"}>{item.status}</Badge>
            </TableCell>
            <TableCell>{item.owner}</TableCell>
            <TableCell>{item.createdAt}</TableCell>
            <TableCell>
              <Progress value={item.progress} className='w-full' />
            </TableCell>
            <TableCell>
              <Button variant='outline'>View</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
