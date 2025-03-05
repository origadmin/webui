import * as React from "react";
import { cn } from "@/lib/utils";

const ContentContext = React.createContext<{
  offset: number;
  fixed: boolean;
} | null>(null);

export interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  fixed?: boolean;
}

const Content = ({ className, fixed = false, ...props }: ContentProps) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const div = divRef.current;

    if (!div) return;
    const onScroll = () => setOffset(div.scrollTop);

    // clean up code
    div.removeEventListener("scroll", onScroll);
    div.addEventListener("scroll", onScroll, { passive: true });
    return () => div.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ContentContext.Provider value={{ offset, fixed }}>
      <div
        ref={divRef}
        data-layout='layout'
        className={cn("h-full overflow-auto", fixed && "flex flex-col", className)}
        {...props}
      />
    </ContentContext.Provider>
  );
};
Content.displayName = "Content";

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  showBreadcrumbs?: boolean;
  breadcrumbRender?: (props: HeaderProps) => React.ReactNode;
  sticky?: boolean;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(({ className, sticky, ...props }, ref) => {
  // Check if Layout.Header is used within Layout
  const contextVal = React.useContext(ContentContext);
  if (contextVal === null) {
    throw new Error(`Layout.Header must be used within ${Content.displayName}.`);
  }

  return (
    <div
      ref={ref}
      data-layout='header'
      className={cn(
        `flex h-[var(--header-height)] items-center gap-2 p-2 md:px-2`,
        contextVal.offset > 10 && sticky ? "shadow" : "shadow-none",
        contextVal.fixed && "flex-none",
        sticky && "sticky top-0",
        className,
      )}
      {...props}
    />
  );
});
Header.displayName = "Header";

const Body = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  // Check if Layout.Body is used within Layout
  const contextVal = React.useContext(ContentContext);
  if (contextVal === null) {
    throw new Error(`Layout.Body must be used within ${Content.displayName}.`);
  }

  return (
    <div
      ref={ref}
      data-layout='body'
      className={cn("p-2 md:overflow-hidden md:px-2", contextVal && contextVal.fixed && "flex-1", className)}
      {...props}
    />
  );
});
Body.displayName = "Body";

Content.Header = Header;
Content.Body = Body;

export { Content, Body as ContentBody, Header as ContentHeader };
