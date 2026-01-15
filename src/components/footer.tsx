import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type FooterLink = {
  key?: string;
  title: string;
  href: string;
  blank?: boolean;
};

export type FooterProps = {
  className?: string;
  copyright?: string;
  links?: FooterLink[];
  logo?: string;
};

export function Footer({ className, copyright = "OrigAdmin", links = [], logo = "/static/logo.svg" }: FooterProps) {
  return (
    <footer className={cn("relative flex h-14 items-center border-t bg-background px-4 sm:px-6", className)}>
      {/* Centered Logo and Copyright */}
      <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2'>
        <img src={logo} alt='Logo' className='h-6 w-6' />
        <div className='text-sm text-muted-foreground'>
          ©{new Date().getFullYear()}{" "}
          <a
            href='https://github.com/origadmin'
            target='_blank'
            rel='noopener noreferrer'
            className='font-medium underline underline-offset-4'
          >
            {copyright}
          </a>
          . All Rights Reserved.
        </div>
      </div>

      {/* Right-aligned Links */}
      <div className='ml-auto flex items-center gap-4'>
        <nav className='flex items-center gap-4 text-sm text-muted-foreground'>
          {links.map((link) => (
            <Link
              key={link.key || link.href}
              to={link.href}
              target={link.blank ? "_blank" : undefined}
              className='hover:text-foreground'
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
