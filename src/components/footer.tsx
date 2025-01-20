import React from "react";
import { randomKey } from "@/utils/crypto.tsx";

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
        key: randomKey(),
        title: "FAQs",
      },
      {
        key: randomKey(),
        title: "Privacy Policy",
      },
      {
        key: randomKey(),
        title: "Terms & Conditions",
      },
      {
        key: randomKey(),
        title: "Refund Policy",
      },
    ],
    copyright = "OrigAdmin",
  } = props || {};

  return (
    <footer className='border-grid flex flex-col items-center justify-center gap-2 border-t p-2 md:px-8 md:py-2'>
      <div className='flex w-full flex-col items-center justify-end gap-2 p-2 xl:flex-row'>
        <div>
          <ul className='flex w-full flex-wrap items-center justify-center gap-3 sm:flex-nowrap md:gap-10'>
            {links?.flatMap((link: LinkProps) => (
              <li key={link.key}>
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
        <div className='w-full min-w-0 flex-col gap-1 p-2 text-center text-sm text-zinc-500 md:text-sm dark:text-zinc-400'>
          ©{new Date().getFullYear()} {copyright}. All Rights Reserved.
        </div>
      )}
    </footer>
  );
}
