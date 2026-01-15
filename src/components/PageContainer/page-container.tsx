import React, { Fragment, JSX } from "react";
// Import Fragment
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import Watermark, { WatermarkProps } from "@/components/Watermark";
import { BreadcrumbProps, Breadcrumbs } from "@/components/breadcrumbs";
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

function PageContainer({
  children,
  props,
  headerProps = {
    showBreadcrumbs: true,
  },
  headerRender,
  watermarkProps: initialWatermarkProps,
  scrollable = false,
}: PageContainerProps) {
  const { className } = props || {};
  const { initialData } = useAuth() as { initialData: InitialDataConfig };

  const watermarkProps = initialWatermarkProps ?? initialData?.watermark;

  const renderScrollArea = (content: React.ReactNode) => {
    return scrollable ? (
      <ScrollArea>
        <div className='md:px-6'>{content}</div>
      </ScrollArea>
    ) : (
      <div className='md:px-6'>{content}</div>
    );
  };

  return (
    <Fragment>
      {/* Render Watermark as a sibling, not a parent */}
      {watermarkProps && <Watermark {...watermarkProps} />}
      <Content {...props} fixed>
        <ContentHeader className='gap-2 justify-between shadow-none ease-linear'>
          <div className='px-8 flex flex-col'>{headerProps.showBreadcrumbs && <Breadcrumbs />}</div>
          <div className='px-8 flex flex-col'>{headerRender && headerRender()}</div>
        </ContentHeader>
        <ContentBody>
          <div className={cn("p-2", className)}>{renderScrollArea(children)}</div>
        </ContentBody>
      </Content>
    </Fragment>
  );
}

export { PageContainer };
