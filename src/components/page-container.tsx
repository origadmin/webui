import React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Content, ContentProps, HeaderProps } from "@/components/content";

interface PageContainerProps {
  children: React.ReactNode;
  props?: ContentProps;
  headerProps?: HeaderProps;
  scrollable?: boolean;
}

export default function PageContainer({
  children,
  props,
  headerProps = {
    show: true,
  },
  scrollable = false, // using the global scroll
}: PageContainerProps) {
  const { className } = props || {};
  const renderScrollArea = () => {
    return scrollable ? (
      <ScrollArea className='h-[calc(100dvh-52px)]'>
        <div className='h-full md:px-6'>{children}</div>
      </ScrollArea>
    ) : (
      <div className='h-full md:px-6'>{children}</div>
    );
  };
  const renderContent = () => {
    return (
      <Content {...props}>
        {headerProps.show && (
          <Content.Header className='gap-2 justify-between shadow-none ease-linear'>
            <div className='p-4 md:px-6'>
              <Breadcrumbs />
            </div>
          </Content.Header>
        )}
        <Content.Body>
          <div className={cn("board flex flex-col mx-auto py-4", className)}>{renderScrollArea()}</div>
        </Content.Body>
      </Content>
    );
  };
  return renderContent();
}
