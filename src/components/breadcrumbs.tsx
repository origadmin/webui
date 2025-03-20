import { Fragment } from "react";
import { Slash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type BreadcrumbProps = {
  separator?: React.ReactNode;
  className?: string;
};

export function Breadcrumbs({ separator = <Slash />, ...props }: BreadcrumbProps) {
  const items = useBreadcrumbs();
  const { className } = props;
  if (items.length === 0) return null;

  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={index}>
            {index !== items.length - 1 && (
              <BreadcrumbItem className='hidden md:block'>
                <BreadcrumbLink href={item.link}>{item.title}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {index < items.length - 1 && (
              <BreadcrumbSeparator className='hidden md:block'>{separator}</BreadcrumbSeparator>
            )}
            {index === items.length - 1 && <BreadcrumbPage>{item.title}</BreadcrumbPage>}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
