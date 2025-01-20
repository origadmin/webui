import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Breadcrumbs } from "@/components/breadcrumbs.tsx";

export default function PageContainer({
  children,
  scrollable = true,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      <div className='p-4 md:px-6'>
        <Breadcrumbs />
      </div>
      {scrollable ? (
        <ScrollArea className='h-[calc(100dvh-52px)]'>
          <div className='h-full p-4 md:px-6'>{children}</div>
        </ScrollArea>
      ) : (
        <div className='h-full p-4 md:px-6'>{children}</div>
      )}
    </>
  );
}
