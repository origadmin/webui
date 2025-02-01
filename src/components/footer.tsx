import { cn } from "@/lib/utils";

type FooterLink = {
  key?: string;
  title: string;
  href?: string;
  blank?: boolean;
  links?: FooterLink[];
};

export type FooterProps = {
  className?: string;
  links?: FooterLink[];
  logo?: string;
  copyright?: string;
};

export function Footer({ className, ...props }: FooterProps) {
  const { links = [], logo = "/static/logo.svg", copyright = "OrigAdmin" } = props || {};

  return (
    <footer
      className={cn(
        "relative flex flex-1 flex-col bg-background",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className,
      )}
    >
      {/*<footer className='border-grid flex flex-col items-center justify-center gap-2 border-t p-2 md:px-8 md:py-2'>*/}
      <div className='flex w-full flex-col items-center justify-end gap-2 p-2 xl:flex-row'>
        <div>
          <ul className='flex w-full flex-wrap items-center justify-center gap-3 sm:flex-nowrap md:gap-10'>
            {links?.flatMap((link: FooterLink) => (
              <li key={link.key}>
                <a
                  className='text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400'
                  target={link.blank ? "blank" : undefined}
                  href={link.href || "#"}
                >
                  {link.title}
                </a>
                {link.links && (
                  <ul className='mt-1 ml-4 flex flex-col gap-1'>
                    {link.links.flatMap((sublink: FooterLink) => (
                      <li>
                        <a
                          className='text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400'
                          target={sublink.blank ? "blank" : undefined}
                          href={sublink.href || "#"}
                        >
                          {sublink.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {copyright && (
        <div className='w-full min-w-0 flex-col gap-1 p-2 text-center text-sm text-zinc-500 md:text-sm dark:text-zinc-400'>
          ©{new Date().getFullYear()} {copyright}. All Rights Reserved.
        </div>
      )}
      {logo && (
        <div className='flex w-full flex-col justify-center'>
          <img src={logo} alt='Logo' className='h-8 w-auto' />
        </div>
      )}
    </footer>
  );
}
