import React from "react";

type LinkProps = {
  key?: string;
  title: React.ReactNode;
  href?: string;
  blank?: boolean;
};

export type FooterProps = {
  links?: LinkProps[];
  copyright?: string;
};

export function Footer(props?: FooterProps) {
  const {
    links = [
      {
        title: "FAQs",
      },
      {
        title: "Privacy Policy",
      },
      {
        title: "Terms & Conditions",
      },
      {
        title: "Refund Policy",
      },
    ],
    copyright = "OrigAdmin",
  } = props || {};

  return (
    <footer className='border-grid border-t flex flex-col gap-2 p-2 items-center justify-center md:px-8 md:py-2'>
      <div className='flex w-full flex-col items-center justify-end gap-2 p-2 xl:flex-row'>
        <div>
          <ul className='flex w-full flex-wrap items-center justify-center gap-3 sm:flex-nowrap md:gap-10'>
            {links?.flatMap((link: LinkProps) => (
              <li>
                <a
                  className='text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400'
                  target={link.blank ? "blank" : undefined}
                  href={link.href || "#"}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {copyright && (
        <div className='w-full min-w-0 flex-col gap-1 text-center text-sm text-zinc-500 dark:text-zinc-400 md:text-sm p-2'>
          ©{new Date().getFullYear()} {copyright}. All Rights Reserved.
        </div>
      )}
    </footer>
  );
}
