import React, { JSX, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import Watermark, { WatermarkProps } from "@/components/Watermark";
import { Breadcrumbs, BreadcrumbProps } from "@/components/breadcrumbs";
import { Content, ContentBody, ContentHeader, ContentProps, HeaderProps } from "./page-content";

interface PageContainerProps {
  children?: React.ReactNode;
  props?: ContentProps;
  headerProps?: Partial<HeaderProps> & {
    children?: React.ReactNode;
  };
  headerRender?: () => JSX.Element;
  watermarkProps?: Omit<WatermarkProps, "children">;
  breadcrumb?: BreadcrumbProps;
  scrollable?: boolean;
}

const watermark = {
  content: "OrigAdmin",
  fontWeight: "bold",
  fontFamily: "Arial",
  opacity: 0.3,
  rotate: 45,
  width: 100, // Reduce the width of a single watermark
  height: 100, // Reduce the height of a single watermark
  x: 0,
  y: 0,
  zIndex: 1,
  position: "absolute",
  top: 0, // Adjust to the top
  left: 0, // Adjust to the left
};

export function PageContainer({
  children,
  props,
  headerProps = {
    showBreadcrumbs: true,
  },
  headerRender,
  watermarkProps = watermark,
  scrollable = false, // using the global scroll
}: PageContainerProps) {
  const { className } = props || {};
  const renderScrollArea = () => {
    return scrollable ? (
      <ScrollArea className='h-[calc(100dvh-52px)]'>
        <div className='h-full md:px-6'>{renderWatermark(children)}</div>
      </ScrollArea>
    ) : (
      <div className='h-full md:px-6'>{renderWatermark(children)}</div>
    );
  };

  const renderWatermark = (children: ReactNode) => {
    return watermarkProps ? <Watermark {...watermarkProps}>{children}</Watermark> : children;
  };
  const renderContent = () => {
    return (
      <Content {...props}>
        <ContentHeader className='gap-2 justify-between shadow-none ease-linear'>
          <div className='px-8 flex flex-col'>{headerProps.showBreadcrumbs && <Breadcrumbs />}</div>
          <div className='px-8 flex flex-col'>{headerRender && headerRender()}</div>
        </ContentHeader>
        <ContentBody>
          {<div className={cn("p-2 flex flex-col mx-auto", className)}>{renderScrollArea()}</div>}
        </ContentBody>
      </Content>
    );
  };
  return renderContent();
}
