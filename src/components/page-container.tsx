import React, { JSX, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Content, ContentProps, HeaderProps } from "@/components/content";

interface PageContainerProps {
  children: React.ReactNode;
  props?: ContentProps;
  headerProps?: HeaderProps;
  headerRender?: () => JSX.Element;
  scrollable?: boolean;
}

export default function PageContainer({
  children,
  props,
  headerProps = {
    showBreadcrumbs: true,
  },
  headerRender,
  scrollable = false, // using the global scroll
}: PageContainerProps) {
  const { className } = props || {};
  const renderScrollArea = () => {
    return scrollable ? (
      <ScrollArea className='h-[calc(100dvh-52px)]'>
        <div className='h-full md:px-6'>{renderCard(children)}</div>
      </ScrollArea>
    ) : (
      <div className='h-full md:px-6'>{renderCard(children)}</div>
    );
  };

  const renderCard = (body: ReactNode) => {
    // if (card) {
    //   return (
    //     <Card>
    //       <div className='card-body'>{body}</div>
    //     </Card>
    //   );
    // }
    return body;
  };
  const renderContent = () => {
    return (
      <Content {...props}>
        <Content.Header className='gap-2 justify-between shadow-none ease-linear'>
          <div className='px-8 flex flex-col'>{headerProps.showBreadcrumbs && <Breadcrumbs />}</div>
          <div className='px-8 flex flex-col'>{headerRender && headerRender()}</div>
        </Content.Header>
        <Content.Body>
          {<div className={cn("p-2 flex flex-col mx-auto", className)}>{renderScrollArea()}</div>}
        </Content.Body>
      </Content>
    );
  };
  return renderContent();
}
